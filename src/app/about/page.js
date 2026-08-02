/*
  FILE: about.js  (About Us page)

  WHERE THIS GOES — pick ONE:
    App Router   -> app/about/page.js
    Pages Router -> pages/about.js

  Either way, rename this file to page.js (App Router) or about.js
  (Pages Router, already named correctly) and drop it in that location.
  No other setup needed — data is pulled from team-data.js.

  DEPENDS ON:
    ../data/team-data.js  (adjust the import path below to match where
    you actually placed that file, e.g. "@/app/data/team-data" or
    "../../lib/team-data")
*/

import Link from "next/link";
import { founder } from "../../lib/team-data";

export default function AboutPage() {
  return (
    <main className="jv-about">
      <section className="hero">
        <p className="eyebrow">About Juris Veda</p>
        <h1>Law school notes, the way they should have been written the first time.</h1>
        <p className="lede">
          Juris Veda is a subject-wise resource hub for Indian law students — notes, case-law
          breakdowns, blogs, and recent developments, organised the way you actually study, not
          the way a library catalogues.
        </p>
      </section>

      <section className="story">
        <div className="story-text">
          <h2>How it started</h2>
          <p>
            Juris Veda was founded in 2025 by a fifth-year law student who was tired of
            hunting across a dozen scattered PDFs, WhatsApp forwards, and inconsistent
            coaching-class notes just to revise one subject properly. What began as a
            personal set of notes, shared with a few batchmates before an exam, turned into
            a running project: organise it properly, keep it updated, and open it up to
            every law student who needs it.
          </p>
          <p>
            The name draws on two ideas — <em>Juris</em>, the law, and <em>Veda</em>,
            knowledge — a resource meant to make the law more knowable, not less.
          </p>
        </div>
        <div className="story-mission">
          <h3>Our mission</h3>
          <p>
            To give every Indian law student — regardless of which city, college, or
            coaching budget they start from — access to clear, accurate, exam-ready legal
            resources, written by students who understand exactly what the exam demands.
          </p>
        </div>
      </section>

      <section className="difference">
        <h2>What makes Juris Veda different</h2>
        <div className="difference-grid">
          <div className="difference-card">
            <span className="card-icon">🗂️</span>
            <h3>Organised like your syllabus</h3>
            <p>Notes and case laws are filed by subject, not by upload date — find what you need in two clicks.</p>
          </div>
          <div className="difference-card">
            <span className="card-icon">✍️</span>
            <h3>Written by students, for students</h3>
            <p>Every contributor is a law student or recent graduate who has sat the same exams you're preparing for.</p>
          </div>
          <div className="difference-card">
            <span className="card-icon">🔄</span>
            <h3>Kept current</h3>
            <p>A dedicated Recent Developments feed tracks judgments, amendments, and updates as they happen.</p>
          </div>
          <div className="difference-card">
            <span className="card-icon">🆓</span>
            <h3>Free, always</h3>
            <p>No paywalls on core notes and case law — Juris Veda exists to lower the barrier, not raise it.</p>
          </div>
        </div>
      </section>

      <section className="founder-note">
        <div className="founder-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={founder.photo} alt={founder.name} />
        </div>
        <div className="founder-words">
          <p className="eyebrow">From the founder</p>
          <blockquote>{founder.bio}</blockquote>
          <p className="founder-name">
            {founder.name}
            <span className="founder-role"> — {founder.role}</span>
          </p>
          <div className="founder-links">
            {founder.linkedin && (
              <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            )}
            {founder.instagram && (
              <a href={founder.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            )}
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Want to contribute?</h2>
        <p>If you write clearly and know your subject, we'd like to read your work.</p>
        <Link href="/submit-post" className="cta-button">Submit a Post</Link>
      </section>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap");
        :root {
          --jv-navy: #1b2a47;
          --jv-navy-light: #2a3f63;
          --jv-parchment: #f7f1e4;
          --jv-parchment-dark: #efe6d2;
          --jv-gold: #c9962f;
          --jv-gold-light: #e0b563;
          --jv-ink: #201b13;
          --jv-maroon: #722f37;
        }
      `}</style>

      <style jsx>{`
        .jv-about {
          background: var(--jv-parchment);
          color: var(--jv-ink);
          font-family: "Inter", sans-serif;
        }
        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--jv-gold);
          margin-bottom: 0.75rem;
        }
        h1, h2, h3 {
          font-family: "Fraunces", serif;
          color: var(--jv-navy);
          line-height: 1.15;
        }
        .hero {
          max-width: 780px;
          margin: 0 auto;
          padding: 5rem 1.5rem 3rem;
          text-align: center;
        }
        .hero h1 {
          font-size: clamp(2rem, 4.5vw, 3rem);
          margin: 0 0 1.25rem;
        }
        .lede {
          font-size: 1.15rem;
          line-height: 1.6;
          color: #4a4335;
        }
        .story {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 3rem;
        }
        .story-text p {
          line-height: 1.75;
          margin-bottom: 1.1rem;
        }
        .story-mission {
          background: var(--jv-navy);
          color: var(--jv-parchment);
          padding: 2rem;
          border-radius: 6px;
          align-self: start;
        }
        .story-mission h3 {
          color: var(--jv-gold-light);
          font-size: 1.15rem;
          margin-top: 0;
        }
        .story-mission p {
          line-height: 1.7;
        }
        .difference {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem;
        }
        .difference h2 {
          text-align: center;
          font-size: 1.8rem;
          margin-bottom: 2.5rem;
        }
        .difference-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .difference-card {
          background: #fff;
          border: 1px solid var(--jv-parchment-dark);
          border-radius: 8px;
          padding: 1.75rem 1.5rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .difference-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(27, 42, 71, 0.08);
        }
        .card-icon {
          font-size: 1.75rem;
          display: block;
          margin-bottom: 0.75rem;
        }
        .difference-card h3 {
          font-size: 1.05rem;
          margin: 0 0 0.5rem;
        }
        .difference-card p {
          font-size: 0.92rem;
          line-height: 1.55;
          color: #5a5342;
          margin: 0;
        }
        .founder-note {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        .founder-photo img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          border-radius: 8px;
          border: 3px solid var(--jv-gold);
        }
        blockquote {
          font-family: "Fraunces", serif;
          font-size: 1.3rem;
          font-style: italic;
          line-height: 1.5;
          color: var(--jv-navy);
          margin: 0 0 1rem;
        }
        .founder-name {
          font-weight: 600;
          margin: 0 0 0.5rem;
        }
        .founder-role {
          font-weight: 400;
          color: #6b6250;
        }
        .founder-links a {
          color: var(--jv-navy);
          margin-right: 1.25rem;
          font-size: 0.9rem;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .founder-links a:focus-visible,
        .cta-button:focus-visible {
          outline: 3px solid var(--jv-gold);
          outline-offset: 2px;
        }
        .cta {
          text-align: center;
          background: var(--jv-navy);
          padding: 4rem 1.5rem;
        }
        .cta h2 {
          color: #fff;
          margin: 0 0 0.5rem;
        }
        .cta p {
          color: #cdd3de;
          margin: 0 0 1.75rem;
        }
        .cta-button {
          display: inline-block;
          background: var(--jv-gold);
          color: var(--jv-navy);
          font-weight: 600;
          padding: 0.85rem 2rem;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .cta-button:hover {
          background: var(--jv-gold-light);
        }
        @media (max-width: 800px) {
          .story {
            grid-template-columns: 1fr;
          }
          .difference-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .founder-note {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .founder-photo img {
            width: 160px;
            margin: 0 auto;
          }
        }
        @media (max-width: 480px) {
          .difference-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
