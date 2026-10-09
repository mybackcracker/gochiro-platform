"""Read-only audit of generated or live public HTML; no form submissions."""
import argparse
import concurrent.futures
import json
import re
import urllib.request
import urllib.parse
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree

SITE = "https://www.gochiromobile.com"
PAGE_TYPES = {"WebPage", "AboutPage", "ContactPage", "CollectionPage"}

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.titles, self.descriptions, self.canonicals, self.schemas, self.links = [], [], [], [], []
        self.capture, self.buffer = None, []
        self.h1 = 0
        self.noindex = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title" or (tag == "script" and attrs.get("type") == "application/ld+json"):
            self.capture, self.buffer = tag, []
        if tag == "meta" and attrs.get("name") == "description":
            self.descriptions.append(attrs.get("content", ""))
        if tag == "meta" and attrs.get("name") == "robots":
            self.noindex |= "noindex" in attrs.get("content", "")
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs.get("href", ""))
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag == "h1":
            self.h1 += 1

    def handle_data(self, data):
        if self.capture:
            self.buffer.append(data)

    def handle_endtag(self, tag):
        if tag == self.capture:
            data = "".join(self.buffer)
            if tag == "title":
                self.titles.append(data)
            else:
                self.schemas.append(json.loads(data))
            self.capture, self.buffer = None, []

def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": "GoChiroMobile-SearchAudit/1.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode(), response.status, response.geturl()

def run():
    args = argparse.ArgumentParser()
    args.add_argument("--base-url", help="Fetch every sitemap route plus /book; otherwise inspect generated HTML")
    args.add_argument("--output", required=True)
    options = args.parse_args()
    sitemap_text = fetch(options.base_url.rstrip("/") + "/sitemap.xml")[0] if options.base_url else Path(".next/server/app/sitemap.xml.body").read_text()
    urls = [node.text for node in ElementTree.fromstring(sitemap_text).iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    assert len(urls) == len(set(urls)), "Duplicate sitemap URLs"
    assert all(url == SITE or url.startswith(SITE + "/") for url in urls), "Non-www sitemap URL"
    paths = [urllib.parse.urlparse(url).path or "/" for url in urls]
    if "/book" not in paths:
        paths.append("/book")
    redirects = set(re.findall(r'source: "([^"]+)"', Path("next.config.ts").read_text())) | {"/tour-schedule"}
    known = set(paths) | redirects

    def inspect(path):
        if options.base_url:
            text, status, final_url = fetch(options.base_url.rstrip("/") + path)
        else:
            file = Path(".next/server/app") / ("index.html" if path == "/" else path.lstrip("/") + ".html")
            if not file.exists():
                return {"path": path, "deferred": "Dynamic route; verify with --base-url"}
            text, status, final_url = file.read_text(), 200, None
        page = Page()
        page.feed(text)
        graph = [node for schema in page.schemas for node in schema.get("@graph", [schema])]
        types = [node.get("@type") for node in graph]
        expected = SITE + ("" if path == "/" else path)
        errors = []
        if len(page.titles) != 1 or not page.titles[0]: errors.append("title")
        if len(page.descriptions) != 1 or not page.descriptions[0]: errors.append("description")
        if page.canonicals != [expected]: errors.append("canonical")
        if not PAGE_TYPES.intersection(types): errors.append("page schema")
        if page.noindex: errors.append("unexpected noindex")
        for node in graph:
            for key in ("url", "@id"):
                value = node.get(key, "")
                if isinstance(value, str) and value.startswith("https://gochiromobile.com"):
                    errors.append("schema host")
        broken = []
        for link in page.links:
            resolved = urllib.parse.urlparse(urllib.parse.urljoin(SITE + path, link))
            if resolved.netloc in {"www.gochiromobile.com", "gochiromobile.com"} and resolved.path.rstrip("/") not in known and resolved.path != "/" and not Path("public" + resolved.path).is_file():
                broken.append(resolved.path)
        if broken: errors.append("broken internal links")
        return {"path": path, "status": status, "final_url": final_url, "title": page.titles[0] if page.titles else None, "canonical": page.canonicals, "schema_types": types, "h1_count": page.h1, "errors": errors, "broken_links": sorted(set(broken))}

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(inspect, paths))
    report = {"sitemap_urls": len(urls), "checked": sum("errors" in row for row in results), "deferred": sum("deferred" in row for row in results), "failures": [row for row in results if row.get("errors")], "pages": results}
    Path(options.output).write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps({key: report[key] for key in ("sitemap_urls", "checked", "deferred", "failures")}, indent=2))
    if report["failures"]:
        raise SystemExit(1)

if __name__ == "__main__":
    run()
