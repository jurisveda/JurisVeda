"use client";
/*
  FILE: recent-developments.js  (Recent Developments page)

  WHERE THIS GOES — pick ONE:
    App Router   -> app/recent-developments/page.js
    Pages Router -> pages/recent-developments.js

  Rename accordingly and drop it in that location.
  (The "use client" directive at the top is required for App Router because
  this page uses filter state; Pages Router simply ignores it, so no edit
  needed there.)

  DEPENDS ON:
    ../data/law-notes-data.js  (for subject tag colours/icons)

  WHAT TO EDIT:
    - Replace the `updates` array with real entries. `subjectId` must match
      an id in law-notes-data.js so the tag colour lines up automatically.
*/

import { useState, useMemo } from "react";
import { subjects } from "../../lib/law-notes-data";

const updates = [
  {
    headline: "Supreme Court clarifies scope of anticipatory bail under BNSS Section 482",
    summary: "A three-judge bench narrows the circumstances in which courts can impose blanket pre-conditions on anticipatory bail.",
    subjectId: "cpc-crpc",
    date: "2026-02-20",
  },
  {
    headline: "Delhi High Court rules on maintainability of PIL against private companies",
    summary: "Court holds that a writ petition against a private entity is maintainable only where a public duty element is shown.",
    subjectId: "constitutional-law",
    date: "2026-02-15",
  },
  {
    headline: "MCA notifies amendments to Companies (Incorporation) Rules",
    summary: "New rules streamline the SPICe+ filing process and tighten timelines for name reservation.",
    subjectId: "corporate-law",
    date: "2026-02-10",
  },
  {
    headline: "Bombay High Court on admissibility of electronic evidence without Section 65B certificate",
    summary: "Division bench revisits the Arjun Panditrao Khotkar standard in a case involving WhatsApp chat logs.",
    subjectId: "evidence-law",
    date: "2026-01-30",
  },
  {
    headline: "Parliament passes amendment easing patent pre-grant opposition timelines",
    summary: "The amendment shortens the window for pre-grant opposition filings, aimed at reducing patent pendency.",
    subjectId: "ipr",
    date: "2026-01-22",
  },
];

function getSubjectMeta(subjectId) {
  return subjects.find((s) => s.id === subjectId);
}

function monthLabel(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export default function RecentDevelopmentsPage() {
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");

  const months = useMemo(() => {
    const unique = Array.from(new Set(updates.map((u) => monthLabel(u.date))));
    return unique;
  }, []);

  const filtered = useMemo(() => {
    return updates
      .filter((u) => subjectFilter === "all" || u.subjectId === subjectFilter)
      .filter((u) => monthFilter === "all" || monthLabel(u.date) === monthFilter)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [subjectFilter, monthFilter]);

  return (
    <main className="jv-updates">
      <section className="hero">
        <p className="eyebrow">Recent Developments</p>
        <h1>What changed in Indian law, recently</h1>
        <p className="lede">
          A running feed of judgments, amendments, and notifications — filed by subject so you
          can follow just the areas you're studying.
        </p>
      </section>

      <section className="controls">
        <div className="filter">
          <label htmlFor="subject-filter">Subject</label>
          <select
            id="subject-filter"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="all">All subjects</option>
            {subjects.map((s) => (
              <option value={s.id} key={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="month-filter">Month</label>
          <select
            id="month-filter"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="all">All months</option>
            {months.map((m) => (
              <option value={m} key={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="feed">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No updates match this filter yet — check back soon, or widen your filter.</p>
          </div>
        ) : (
          <ol className="timeline">
            {filtered.map((update) => {
              const subject = getSubjectMeta(update.subjectId);
              return (
                <li className="timeline-item" key={update.headline}>
                  <div className="timeline-marker" style={{ "--dot-color": subject?.color || "#1b2a47" }} />
                  <div className="timeline-content">
                    <div className="timeline-top">
                      {subject && (
                        <span className="subject-tag" style={{ "--tag-color": subject.color }}>
                          {subject.icon} {subject.name}
                        </span>
                      )}
                      <span className="timeline-date">
                        {new Date(update.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3>{update.headline}</h3>
                    <p>{update.summary}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap");
        :root {
          --jv-navy: #1b2a47;
          --jv-parchment: #f7f1e4;
          --jv-parchment-dark: #efe6d2;
          --jv-gold: #c9962f;
          --jv-gold-light: #e0b563;
          --jv-ink: #201b13;
          --jv-maroon: #722f37;
        }
      `}</style>

      <style jsx>{`
        .jv-updates {
          background: var(--jv-parchment);
          color: var(--jv-ink);
          font-family: "Inter", sans-serif;
          min-height: 100vh;
        }
        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--jv-gold);
          margin-bottom: 0.75rem;
        }
        .hero {
          max-width: 700px;
          margin: 0 auto;
          padding: 5rem 1.5rem 2.5rem;
          text-align: center;
        }
        .hero h1 {
          font-family: "Fraunces", serif;
          color: var(--jv-navy);
          font-size: clamp(1.9rem, 4.5vw, 2.75rem);
          margin: 0 0 1.25rem;
          line-height: 1.15;
        }
        .lede {
          font-size: 1.05rem;
          line-height: 1.6;
          color: #4a4335;
        }
        .controls {
          max-width: 700px;
          margin: 0 auto;
          padding: 0 1.5rem 2.5rem;
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .filter {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .filter label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--jv-navy);
        }
        .filter select {
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          padding: 0.55rem 0.9rem;
          border: 1px solid var(--jv-parchment-dark);
          border-radius: 6px;
          background: #fff;
          color: var(--jv-ink);
          min-width: 190px;
        }
        .filter select:focus-visible {
          outline: 3px solid var(--jv-gold);
          outline-offset: 1px;
        }
        .feed {
          max-width: 780px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
        }
        .timeline {
          list-style: none;
          margin: 0;
          padding: 0;
          border-left: 2px solid var(--jv-parchment-dark);
        }
        .timeline-item {
          position: relative;
          padding: 0 0 2rem 2rem;
        }
        .timeline-marker {
          --dot-color: var(--jv-navy);
          position: absolute;
          left: -7px;
          top: 4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--dot-color);
          border: 2px solid var(--jv-parchment);
        }
        .timeline-top {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }
        .subject-tag {
          --tag-color: var(--jv-navy);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--tag-color);
          background: color-mix(in srgb, var(--tag-color) 14%, #fff);
          padding: 0.22rem 0.6rem;
          border-radius: 999px;
        }
        .timeline-date {
          font-size: 0.78rem;
          color: #8a8168;
        }
        .timeline-content h3 {
          font-family: "Fraunces", serif;
          color: var(--jv-navy);
          font-size: 1.1rem;
          line-height: 1.35;
          margin: 0 0 0.4rem;
        }
        .timeline-content p {
          font-size: 0.92rem;
          line-height: 1.55;
          color: #4a4335;
          margin: 0;
        }
        .empty-state {
          text-align: center;
          padding: 3rem 1.5rem;
          color: #6b6250;
          border: 1px dashed var(--jv-parchment-dark);
          border-radius: 10px;
          max-width: 780px;
          margin: 0 auto;
        }
      `}</style>
    </main>
  );
}
