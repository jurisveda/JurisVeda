/*
  FILE: blogs.js  (Blogs page)

  WHERE THIS GOES — pick ONE:
    App Router   -> app/blogs/page.js
    Pages Router -> pages/blogs.js

  Rename accordingly and drop it in that location.

  DEPENDS ON:
    ../data/law-notes-data.js  (for subject tag colours/icons)
    ../data/team-data.js       (used only to demo linking an author name to
                                 their Our People profile — see blogPosts below)

  WHAT TO EDIT:
    - Replace the `blogPosts` array with real posts. `authorSlug` should be
      a URL-safe version of the author's name so /our-people can highlight
      or deep-link them later; for now it just builds the Our People link.
    - `subjectId` must match an id in law-notes-data.js so the tag colour
      lines up automatically.
*/

import Link from "next/link";
import { subjects } from "../../lib/law-notes-data";

const blogPosts = [
  {
    title: "Why 'Reading Bare Acts' Is Advice Nobody Explains Properly",
    authorName: "Rohan Malhotra",
    authorSlug: "rohan-malhotra",
    subjectId: "corporate-law",
    readTime: "6 min read",
    date: "2026-02-12",
    excerpt:
      "Everyone tells first-years to 'just read the bare act' — almost nobody explains how to actually get something out of that reading. Here's a method that works.",
  },
  {
    title: "Moot Court Memorials: What Judges Actually Skim For",
    authorName: "Meher Kaur",
    authorSlug: "meher-kaur",
    subjectId: "criminal-law",
    readTime: "8 min read",
    date: "2026-02-05",
    excerpt:
      "After three moot rounds and two panels of very tired judges, here's what consistently earned marks — and what consistently got skipped over.",
  },
  {
    title: "Building a Revision Timetable That Survives Contact With Reality",
    authorName: "Ishita Verma",
    authorSlug: "ishita-verma",
    subjectId: "constitutional-law",
    readTime: "5 min read",
    date: "2026-01-28",
    excerpt:
      "Most study planners fall apart by week two. This one is built around the assumption that you will fall behind — and still get through the syllabus.",
  },
];

function getSubjectMeta(subjectId) {
  return subjects.find((s) => s.id === subjectId);
}

export default function BlogsPage() {
  return (
    <main className="jv-blogs">
      <section className="hero">
        <p className="eyebrow">Blogs</p>
        <h1>Longer reads, from people still in the middle of it</h1>
        <p className="lede">
          Essays and reflections from Juris Veda contributors — on studying law, writing well,
          and everything the syllabus doesn't quite cover.
        </p>
      </section>

      <section className="post-grid">
        {blogPosts.map((post) => {
          const subject = getSubjectMeta(post.subjectId);
          return (
            <article className="post-card" key={post.title}>
              {subject && (
                <span
                  className="subject-tag"
                  style={{ "--tag-color": subject.color }}
                >
                  {subject.icon} {subject.name}
                </span>
              )}
              <h2>{post.title}</h2>
              <p className="excerpt">{post.excerpt}</p>
              <div className="meta">
                <Link href={`/our-people`} className="author-link">
                  {post.authorName}
                </Link>
                <span className="dot">·</span>
                <span>{post.readTime}</span>
                <span className="dot">·</span>
                <span>
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </article>
          );
        })}
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
        .jv-blogs {
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
          padding: 5rem 1.5rem 3rem;
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
        .post-grid {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.75rem;
        }
        .post-card {
          background: #fff;
          border: 1px solid var(--jv-parchment-dark);
          border-radius: 10px;
          padding: 1.75rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .post-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(27, 42, 71, 0.08);
        }
        .subject-tag {
          --tag-color: var(--jv-navy);
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--tag-color);
          background: color-mix(in srgb, var(--tag-color) 14%, #fff);
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          margin-bottom: 0.9rem;
        }
        .post-card h2 {
          font-family: "Fraunces", serif;
          color: var(--jv-navy);
          font-size: 1.25rem;
          line-height: 1.3;
          margin: 0 0 0.6rem;
        }
        .excerpt {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #4a4335;
          margin: 0 0 1.1rem;
        }
        .meta {
          font-size: 0.8rem;
          color: #8a8168;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .author-link {
          color: var(--jv-maroon);
          font-weight: 600;
          text-decoration: none;
        }
        .author-link:hover {
          text-decoration: underline;
        }
        .author-link:focus-visible {
          outline: 3px solid var(--jv-gold);
          outline-offset: 2px;
        }
        .dot {
          color: #c9c0aa;
        }
        @media (max-width: 700px) {
          .post-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
