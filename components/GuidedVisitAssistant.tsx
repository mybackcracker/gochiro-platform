"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ASSISTANT_TOPICS,
  ASSISTANT_PAIN_REGIONS,
  assistantBookingHref,
  assistantGroupPrices,
  assistantIndividualPrices,
  assistantZipResult,
  type AssistantPainRegionId,
  type AssistantPatientCategory,
  type AssistantPriceChoice,
  type AssistantPriceSummary,
  type AssistantTopicId,
} from "@/lib/assistantGuidance";
import styles from "./GuidedVisitAssistant.module.css";

type View =
  | "home" | "zip" | "location-result" | "outside" | "patient-type"
  | "returning-type" | "group-count" | "prices" | "booking-link"
  | "pain-regions" | "pain-detail" | "group-info";
type Intent = "area" | "pricing" | "schedule";

function track(action: string) {
  if (typeof window === "undefined") return;
  const browserWindow = window as Window & { dataLayer?: Array<Record<string, string>> };
  browserWindow.dataLayer?.push({ event: "gochiro_visit_assistant", assistant_action: action });
}

function ChatIcon({ close = false }: { close?: boolean }) {
  return close ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11.5a7.7 7.7 0 0 1-8 7.5 9.7 9.7 0 0 1-3-.5L4 20l1.5-4a7.5 7.5 0 0 1-1.5-4.5 7.7 7.7 0 0 1 8-7.5 7.7 7.7 0 0 1 8 7.5Z" />
      <path d="M8 11.5h8" />
    </svg>
  );
}

const NEW_DESCRIPTION = "First visit, or last seen by Dr. DeFries more than 12 months ago.";
const RETURNING_DESCRIPTION = "Seen by Dr. DeFries within the past 12 months.";

export default function GuidedVisitAssistant() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("home");
  const [history, setHistory] = useState<View[]>([]);
  const [intent, setIntent] = useState<Intent>("area");
  const [zip, setZip] = useState("");
  const [checkedZip, setCheckedZip] = useState("");
  const [category, setCategory] = useState<AssistantPatientCategory>("new");
  const [priceChoice, setPriceChoice] = useState<AssistantPriceChoice>("new");
  const [painRegion, setPainRegion] = useState<AssistantPainRegionId>("neck");
  const [existingCount, setExistingCount] = useState(2);
  const [newCount, setNewCount] = useState(0);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const result = checkedZip ? assistantZipResult(checkedZip) : null;
  const pain = ASSISTANT_PAIN_REGIONS.find((region) => region.id === painRegion);
  const groupCountValid = existingCount + newCount >= 2 && existingCount + newCount <= 6
    && Number.isInteger(existingCount) && Number.isInteger(newCount)
    && existingCount >= 0 && newCount >= 0;

  // The root site layout stays mounted while visiting conditions and scheduling pages,
  // keeping the open panel, last ZIP, and current selection without a second form.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);

  function go(next: View) {
    setHistory((items) => [...items, view]);
    setView(next);
    contentRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }

  function back() {
    const previous = history[history.length - 1] ?? "home";
    setHistory((items) => items.slice(0, -1));
    setView(previous);
  }

  function home() {
    setHistory([]);
    setView("home");
    // Keep the previously verified ZIP for the next question.
  }

  function toggleOpen() {
    if (open) {
      setOpen(false);
      launcherRef.current?.focus();
    } else {
      setOpen(true);
      track("opened");
    }
  }

  function chooseTopic(id: AssistantTopicId) {
    track("topic_" + id);
    if (id === "pain") return go("pain-regions");
    if (id === "group") return go("group-info");
    setIntent(id === "schedule" ? "schedule" : id);
    if (id === "schedule") return go("patient-type");
    return go(result?.kind === "booking" ? id === "area" ? "location-result" : "patient-type" : "zip");
  }

  function checkZip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const routed = assistantZipResult(zip);
    if (routed.kind === "incomplete") return;
    setCheckedZip(zip);
    track("zip_route_" + routed.kind);
    if (routed.kind !== "booking") return go("outside");
    if (intent === "area") return go("location-result");
    if (intent === "pricing") return go("patient-type");
    return go("booking-link");
  }

  function startPricing() {
    setIntent("pricing");
    go(result?.kind === "booking" ? "patient-type" : "zip");
  }

  function startSchedule(categoryChoice?: AssistantPatientCategory) {
    setIntent("schedule");
    if (categoryChoice) {
      setCategory(categoryChoice);
      go(result?.kind === "booking" ? "booking-link" : "zip");
    } else {
      go("patient-type");
    }
  }

  function selectCategory(selected: AssistantPatientCategory) {
    setCategory(selected);
    track("selected_" + selected);
    if (intent === "schedule") return go(result?.kind === "booking" ? "booking-link" : "zip");
    if (selected === "returning") return go("returning-type");
    if (selected === "group") return go("group-count");
    setPriceChoice("new");
    go("prices");
  }

  function selectReturnPrice(option: AssistantPriceChoice) {
    setPriceChoice(option);
    go("prices");
  }

  function trackedLink(href: string) {
    track(href.startsWith("/book?") ? "booking_link_clicked" : "information_link_clicked");
  }

  function linkButton(label: string, href: string) {
    return (
      <Link href={href} className={styles.actionLink} onClick={() => trackedLink(href)}>
        {label} <span aria-hidden="true">↗</span>
      </Link>
    );
  }

  function option(label: string, onClick: () => void, detail?: string) {
    return (
      <button type="button" className={styles.topic} onClick={onClick}>
        <span><strong>{label}</strong>{detail && <small>{detail}</small>}</span>
        <span aria-hidden="true">›</span>
      </button>
    );
  }

  function priceTable(prices: AssistantPriceSummary) {
    return (
      <dl className={styles.priceTable}>
        <div><dt>Weekday</dt><dd>{prices.weekday}</dd></div>
        <div><dt>Saturday</dt><dd>{prices.saturday}</dd></div>
        <div><dt>Sunday</dt><dd>{prices.sunday}</dd></div>
      </dl>
    );
  }

  function resultLinks() {
    if (!result) return null;
    return <div className={styles.links}>
      {result.links.map((link) => <Link key={link.href} href={link.href} onClick={() => trackedLink(link.href)} className={styles.actionLink}>{link.label} <span aria-hidden="true">↗</span></Link>)}
    </div>;
  }

  function renderView() {
    if (view === "home") return (
      <>
        <p className={styles.botMessage}>Welcome! What can I help you with?</p>
        <div className={styles.topics}>
          {ASSISTANT_TOPICS.map((item) => <div key={item.id}>{option(item.question, () => chooseTopic(item.id))}</div>)}
        </div>
      </>
    );

    if (view === "zip") return (
      <div className={styles.exchange}>
        <p className={styles.botMessage}>
          {intent === "area" ? "What ZIP code would you like us to visit?" :
           intent === "pricing" ? "What's the ZIP code where you'd like us to come?" :
           "What ZIP code would you like us to visit?"}
        </p>
        <form className={styles.zipForm} onSubmit={checkZip}>
          <label htmlFor="assistant-zip">Visit ZIP code</label>
          <div className={styles.zipRow}>
            <input
              id="assistant-zip"
              value={zip}
              onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))}
              placeholder="5-digit ZIP"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              pattern="[0-9]{5}"
              required
            />
            <button type="submit" disabled={zip.length !== 5}>Continue</button>
          </div>
        </form>
      </div>
    );

    if (view === "outside") return (
      <div className={styles.exchange}>
        <p className={styles.botMessage}>{result?.message}</p>
        {resultLinks()}
        {option("Ask another question", home)}
      </div>
    );

    if (view === "location-result") return (
      <div className={styles.exchange}>
        <p className={styles.botMessage}>{result?.message} Dr. DeFries comes to your home or workplace.</p>
        <div className={styles.topics}>
          {option("See visit prices", startPricing)}
          {option("Schedule an appointment", () => startSchedule())}
          {option("Ask another question", home)}
        </div>
      </div>
    );

    if (view === "patient-type") return (
      <div className={styles.exchange}>
        <p className={styles.botMessage}>
          {intent === "pricing" ? "What type of visit are you interested in?" : "Are you a new patient, returning patient, or scheduling a Group Visit?"}
        </p>
        <div className={styles.topics}>
          {option("New Patient", () => selectCategory("new"), NEW_DESCRIPTION)}
          {option("Returning Patient", () => selectCategory("returning"), RETURNING_DESCRIPTION)}
          {option("Group Visit", () => selectCategory("group"), "Two or more people at the same appointment and location.")}
        </div>
      </div>
    );

    if (view === "returning-type") return (
      <div className={styles.exchange}>
        <p className={styles.botMessage}>Which returning-patient visit do you need?</p>
        <div className={styles.topics}>
          {option("Maintenance / Wellness", () => selectReturnPrice("maintenance"), "Routine care; requires at least 48 hours' notice.")}
          {option("Priority Visit", () => selectReturnPrice("priority"), "A new, worsening, or more urgent concern.")}
        </div>
      </div>
    );

    if (view === "group-count") return (
      <div className={styles.exchange}>
        <p className={styles.botMessage}>How many people will be seen at this Group Visit?</p>
        <p className={styles.smallNote}>Returning patients were seen by Dr. DeFries within the past 12 months. Someone last seen more than a year ago counts as a new patient.</p>
        <div className={styles.countRow}>
          <label htmlFor="assistant-existing-count">Returning patients
            <input id="assistant-existing-count" type="number" min="0" max="6" step="1" value={existingCount} onChange={(e) => setExistingCount(Number(e.target.value))} />
          </label>
          <label htmlFor="assistant-new-count">New patients
            <input id="assistant-new-count" type="number" min="0" max="6" step="1" value={newCount} onChange={(e) => setNewCount(Number(e.target.value))} />
          </label>
        </div>
        <p className={styles.smallNote}>For two to six patients. New injuries or significantly worsening complaints require an individual visit.</p>
        <button type="button" className={styles.primaryButton} disabled={!groupCountValid} onClick={() => go("prices")}>See group prices</button>
      </div>
    );

    if (view === "prices") {
      const prices = category === "group"
        ? assistantGroupPrices(checkedZip, newCount, existingCount)
        : assistantIndividualPrices(checkedZip, priceChoice);
      const label = category === "group" ? "Group Visit" :
        priceChoice === "new" ? "New Patient" :
        priceChoice === "maintenance" ? "Maintenance / Wellness" : "Priority Visit";
      const href = assistantBookingHref(checkedZip, category);
      return (
        <div className={styles.exchange}>
          <p className={styles.botMessage}>Current listed prices for {label} in ZIP {checkedZip}:</p>
          {prices && priceTable(prices)}
          <p className={styles.smallNote}>
            {category === "group" ? "Group totals depend on the number of new and returning patients." :
             priceChoice === "priority" ? "Priority fees depend on the visit details." :
             "Availability depends on your selected date."}
            {" "}The scheduler confirms your final price and availability before booking.
          </p>
          {href && linkButton("See available appointment times", href)}
          {option("Ask another question", home)}
        </div>
      );
    }

    if (view === "booking-link") {
      const href = assistantBookingHref(checkedZip, category);
      return (
        <div className={styles.exchange}>
          <p className={styles.botMessage}>You're ready to schedule. Your ZIP code and appointment category will carry into booking.</p>
          {href ? linkButton("Continue to scheduling", href) : <p>Please check your ZIP code.</p>}
          {option("Ask another question", home)}
        </div>
      );
    }

    if (view === "pain-regions") return (
      <div className={styles.exchange}>
        <p className={styles.botMessage}>Where are you experiencing pain?</p>
        <p className={styles.smallNote}>Information is for educational purposes only, not a medical diagnosis.</p>
        <div className={styles.topics}>
          {ASSISTANT_PAIN_REGIONS.map((item) => <div key={item.id}>{option(item.label, () => { setPainRegion(item.id); go("pain-detail"); })}</div>)}
        </div>
      </div>
    );

    if (view === "pain-detail") return (
      <div className={styles.exchange}>
        <p className={styles.botMessage}>{pain?.summary}</p>
        <div className={styles.topics}>
          {pain && linkButton(pain.id === "other" ? "Learn more about conditions" : "Learn more about " + pain.label.toLowerCase(), pain.href)}
          {option("Schedule a visit", () => startSchedule())}
          {option("Ask another question", home)}
        </div>
      </div>
    );

    return (
      <div className={styles.exchange}>
        <p className={styles.botMessage}>Group Visits are when two or more people are seen at one location during the same appointment.</p>
        <div className={styles.topics}>
          {linkButton("Learn more about Group Visits", "/group-visits/standard")}
          {option("Schedule a Group Visit", () => startSchedule("group"))}
          {option("Ask another question", home)}
        </div>
      </div>
    );
  }

  return (
    <aside className={styles.assistant} aria-label="Go Chiro Mobile visit assistant">
      {open && (
        <section className={styles.panel} id="visit-assistant-panel" aria-label="Visit assistant questions">
          <div className={styles.header}>
            <span className={styles.headerIcon}><ChatIcon /></span>
            <div className={styles.headerText}><strong>Visit Assistant</strong><span>Go Chiro Mobile</span></div>
            <button ref={closeRef} type="button" className={styles.close} onClick={toggleOpen} aria-label="Close visit assistant"><ChatIcon close /></button>
          </div>
          <div className={styles.content} ref={contentRef}>
            {view !== "home" && (
              <button type="button" className={styles.back} onClick={back}>
                ← Back
              </button>
            )}
            <div aria-live="polite">{renderView()}</div>
          </div>
          <div className={styles.footer}>
            <div className={styles.contact}>
              Prefer a person? <a href="tel:+16104940412" onClick={() => track("phone_clicked")}>Call</a> or{" "}
              <a href="sms:+16104940412" onClick={() => track("text_clicked")}>text 610-494-0412</a>
            </div>
            <p>Please don't send personal medical details here. For emergencies, call 911.</p>
          </div>
        </section>
      )}
      <button ref={launcherRef} type="button" className={styles.launcher} onClick={toggleOpen} aria-controls="visit-assistant-panel" aria-expanded={open}>
        <span className={styles.launcherIcon}><ChatIcon close={open} /></span>
        <span>{open ? "Close help" : "Questions? Ask here"}</span>
      </button>
    </aside>
  );
}
