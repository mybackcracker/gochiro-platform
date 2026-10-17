"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ASSISTANT_TOPICS,
  assistantTopic,
  assistantZipResultForTopic,
  type AssistantTopicId,
  type AssistantZipResult,
} from "@/lib/assistantGuidance";
import styles from "./GuidedVisitAssistant.module.css";

/**
 * Emits anonymous, fixed-category events only if the site has already
 * configured a tag manager dataLayer. No typed ZIPs or patient data are sent.
 * These hooks alone are not an active analytics/reporting integration.
 */
function track(action: string) {
  if (typeof window === "undefined") return;
  const browserWindow = window as Window & {
    dataLayer?: Array<Record<string, string>>;
  };
  browserWindow.dataLayer?.push({
    event: "gochiro_visit_assistant",
    assistant_action: action,
  });
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

export default function GuidedVisitAssistant() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<AssistantTopicId | null>(null);
  const [zip, setZip] = useState("");
  const [zipResult, setZipResult] = useState<AssistantZipResult | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const topic = selected ? assistantTopic(selected) : null;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

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
    setSelected(id);
    setZip("");
    setZipResult(null);
    track("topic_" + id);
  }

  function checkZip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const guidance = assistantZipResultForTopic(selected ?? "area", zip);
    setZipResult(guidance);
    track("zip_route_" + guidance.kind);
  }

  function trackLink(href: string) {
    track(href.startsWith("/book?") ? "booking_link_clicked" : "information_link_clicked");
  }

  return (
    <aside className={styles.assistant} aria-label="Go Chiro Mobile visit assistant">
      {open && (
        <section className={styles.panel} id="visit-assistant-panel" aria-label="Visit assistant questions">
          <div className={styles.header}>
            <span className={styles.headerIcon}><ChatIcon /></span>
            <div className={styles.headerText}>
              <strong>Visit Assistant</strong>
              <span>Go Chiro Mobile</span>
            </div>
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={toggleOpen}
              aria-label="Close visit assistant"
            >
              <ChatIcon close />
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.botMessage}>
              Welcome! I can help you plan a mobile chiropractic visit. What would you like to know?
            </div>
            {topic ? (
              <div className={styles.exchange}>
                <div className={styles.userMessage}>{topic.question}</div>
                <div className={styles.answer} aria-live="polite">
                  <p>{topic.answer}</p>
                  <div className={styles.links}>
                    {topic.links.map((link) => (
                      <Link key={link.href} href={link.href} onClick={() => trackLink(link.href)} className={styles.actionLink}>
                        {link.label} <span aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                  {topic.needsZip && (
                    <form className={styles.zipForm} onSubmit={checkZip}>
                      <label htmlFor="assistant-zip">Enter your visit ZIP code to continue</label>
                      <div className={styles.zipRow}>
                        <input
                          id="assistant-zip"
                          value={zip}
                          onChange={(event) => {
                            setZip(event.target.value.replace(/\D/g, "").slice(0, 5));
                            setZipResult(null);
                          }}
                          placeholder="5-digit ZIP"
                          inputMode="numeric"
                          autoComplete="postal-code"
                          maxLength={5}
                          pattern="[0-9]{5}"
                          required
                        />
                        <button type="submit" disabled={zip.length !== 5}>Check ZIP</button>
                      </div>
                      {zipResult && (
                        <div className={styles.zipResult} role="status">
                          <p>{zipResult.message}</p>
                          <div className={styles.links}>
                            {zipResult.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => trackLink(link.href)}
                                className={styles.actionLink}
                              >
                                {link.label} <span aria-hidden="true">↗</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </form>
                  )}
                </div>
                <button type="button" className={styles.reset} onClick={() => setSelected(null)}>
                  ← Ask a different question
                </button>
              </div>
            ) : (
              <div className={styles.topics}>
                {ASSISTANT_TOPICS.map((item) => (
                  <button key={item.id} type="button" className={styles.topic} onClick={() => chooseTopic(item.id)}>
                    <span>{item.question}</span><span aria-hidden="true">›</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className={styles.footer}>
            <div className={styles.contact}>
              Prefer a person? <a href="tel:+16104940412" onClick={() => track("phone_clicked")}>Call</a> or{" "}
              <a href="sms:+16104940412" onClick={() => track("text_clicked")}>text 610-494-0412</a>
            </div>
            <p>General visit information only. Please do not share symptoms, medical details, or other private information here. For an emergency, call 911.</p>
          </div>
        </section>
      )}
      <button
        ref={launcherRef}
        type="button"
        className={styles.launcher}
        onClick={toggleOpen}
        aria-controls="visit-assistant-panel"
        aria-expanded={open}
      >
        <span className={styles.launcherIcon}><ChatIcon close={open} /></span>
        <span>{open ? "Close help" : "Questions? Ask here"}</span>
      </button>
    </aside>
  );
}
