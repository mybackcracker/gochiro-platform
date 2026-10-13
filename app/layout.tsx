import { SERVICE_AREA_META_DESCRIPTION } from "@/lib/serviceArea";
import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-KXH6EYL9LG";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gochiromobile.com"),
  title: "Go Chiro Mobile — Chiropractic Care That Comes to You",
  description: SERVICE_AREA_META_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </html>
  );
}
