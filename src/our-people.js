/*
  FILE: our-people.js  (Our People page)

  WHERE THIS GOES — pick ONE:
    App Router   -> app/our-people/page.js
    Pages Router -> pages/our-people.js

  Rename accordingly and drop it in that location.

  DEPENDS ON:
    ../data/team-data.js  (adjust the import path to match your project)
*/

import Link from "next/link";
import { founder, teamMembers } from "../../lib/team-data";

export default function OurPeoplePage() {
  return (
    <main className="jv-people">
      <section className="hero">
        <p className="eyebrow">Our People</p>
        <h1>The students behind Juris Veda</h1>
        <p className="lede">
          A founder-led team of law students and graduates writing, editing, and fact-checking
          every note, case brief, and update on the site.
        </p>
      </section>

      <section className="founder-card">
        <div className="photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={founder.photo} alt={founder.name} />
        </div>
        <div className="info">
          <span className="founder-badge">Founder</span>
          <h2>{founder.name}</h2>
          <p className="role">{founder.role}</p>
          <p className="bio">{founder.bio}</p>
          <div className="links">
            {founder.linkedin && (
              <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            )}
            {founder.instagram && (
              <a href={founder.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            )}
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Contributors</h2>

        {teamMembers && teamMembers.length > 0 ? (
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div className="team-card" key={member.name}>
                <div className="photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.photo} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
                <div className="links">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  )}
                  {member.instagram && (
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">🖋️</span>
            <h3>The contributor desk is still filling up.</h3>
            <p>
              We're a young team — right now it's mostly the founder keeping the lights on.
              If you'd like to write for Juris Veda, we'd love to hear from you.
            </p>
            <Link href="/submit-post" className="empty-cta">Submit a Post</Link>
          </div>
        )}
      </section>

      <section className="cta">
        <h2>Want to see your name on this page?</h2>
        <p>We're always looking for law students who want to write.</p>
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
        .jv-people {
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
          max-width: 700px;
          margin: 0 auto;
          padding: 5rem 1.5rem 3rem;
          text-align: center;
        }
        .hero h1 {
          font-size: clamp(2rem, 4.5vw, 3rem);
          margin: 0 0 1.25rem;
        }
        .lede {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #4a4335;
        }
        .founder-card {
          max-width: 900px;
          margin: 0 auto 4rem;
          background: #fff;
          border: 1px solid var(--jv-parchment-dark);
          border-radius: 10px;
          padding: 2.5rem;
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 2rem;
          align-items: center;
        }
        .founder-card .photo img {
          width: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
          border-radius: 8px;
          border: 3px solid var(--jv-gold);
        }
        .founder-badge {
          display: inline-block;
          background: var(--jv-gold);
          color: var(--jv-navy);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          margin-bottom: 0.6rem;
        }
        .founder-card h2 {
          margin: 0 0 0.2rem;
          font-size: 1.5rem;
        }
        .role {
          color: var(--jv-maroon);
          font-weight: 600;
          font-size: 0.9rem;
          margin: 0 0 0.75rem;
        }
        .bio {
          line-height: 1.6;
          color: #4a4335;
          font-size: 0.95rem;
          margin: 0 0 0.9rem;
        }
        .links a {
          color: var(--jv-navy);
          margin-right: 1.1rem;
          font-size: 0.85rem;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .links a:focus-visible,
        .cta-button:focus-visible,
        .empty-cta:focus-visible {
          outline: 3px solid var(--jv-gold);
          outline-offset: 2px;
        }
        .team-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem 4rem;
        }
        .team-section h2 {
          text-align: center;
          font-size: 1.7rem;
          margin-bottom: 2.5rem;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }
        .team-card {
          background: #fff;
          border: 1px solid var(--jv-parchment-dark);
          border-radius: 8px;
          padding: 1.75rem;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .team-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(27, 42, 71, 0.08);
        }
        .team-card .photo img {
          width: 96px;
          height: 96px;
          object-fit: cover;
          border-radius: 50%;
          margin: 0 auto 1rem;
          border: 2px solid var(--jv-gold);
        }
        .team-card h3 {
          font-size: 1.05rem;
          margin: 0 0 0.2rem;
        }
        .team-card .links {
          margin-top: 0.5rem;
        }
        .empty-state {
          max-width: 480px;
          margin: 0 auto;
          text-align: center;
          padding: 3rem 1.5rem;
          border: 1px dashed var(--jv-navy-light);
          border-radius: 10px;
        }
        .empty-icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 1rem;
        }
        .empty-state h3 {
          font-size: 1.2rem;
          margin: 0 0 0.6rem;
        }
        .empty-state p {
          color: #4a4335;
          line-height: 1.6;
          margin: 0 0 1.5rem;
        }
        .empty-cta,
        .cta-button {
          display: inline-block;
          background: var(--jv-gold);
          color: var(--jv-navy);
          font-weight: 600;
          padding: 0.75rem 1.75rem;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .empty-cta:hover,
        .cta-button:hover {
          background: var(--jv-gold-light);
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
        @media (max-width: 700px) {
          .founder-card {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .founder-card .photo img {
            width: 140px;
            margin: 0 auto;
          }
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
