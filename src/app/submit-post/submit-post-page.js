"use client";
/*
  FILE: submit-post.js  (Submit Post page)

  WHERE THIS GOES — pick ONE:
    App Router   -> app/submit-post/page.js
    Pages Router -> pages/submit-post.js

  Rename accordingly and drop it in that location.
  ("use client" is required for App Router since this form uses state;
  Pages Router ignores the directive harmlessly, no edit needed there.)

  DEPENDS ON:
    ../data/law-notes-data.js  (subject dropdown is generated from this,
    so it always matches the Law Notes subjects — edit that file, not this
    one, if you need to add/remove subjects)

  STATUS: No backend yet. On submit, this just validates client-side and
  shows a confirmation message in place of the form. When you're ready to
  wire it up, replace the body of handleSubmit() with your actual API call
  (fetch to a route handler, a form service, email, etc.) — the comment
  inside handleSubmit marks exactly where.
*/

import { useState } from "react";
import { subjects } from "../../lib/law-notes-data";

const initialForm = {
  fullName: "",
  email: "",
  postType: "",
  subject: "",
  title: "",
  content: "",
  bio: "",
  socialLink: "",
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SubmitPostPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!isValidEmail(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.postType) next.postType = "Choose a post type.";
    if (!form.subject) next.subject = "Choose a subject.";
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.content.trim()) next.content = "Content can't be empty.";
    if (!form.bio.trim()) next.bio = "A short author bio is required.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // ---- No backend yet ----
    // Replace this block with your actual submission logic, e.g.:
    //   await fetch("/api/submit-post", { method: "POST", body: JSON.stringify(form) });
    // For now we just show the confirmation state below.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="jv-submit jv-confirmation">
        <div className="confirmation-box">
          <span className="confirm-icon">✅</span>
          <h1>Thank you.</h1>
          <p>Your post has been submitted for review — we'll be in touch within a few days.</p>
        </div>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap");
          :root {
            --jv-navy: #1b2a47;
            --jv-parchment: #f7f1e4;
            --jv-parchment-dark: #efe6d2;
            --jv-gold: #c9962f;
            --jv-ink: #201b13;
          }
        `}</style>
        <style jsx>{`
          .jv-confirmation {
            min-height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--jv-parchment);
            font-family: "Inter", sans-serif;
            padding: 2rem 1.5rem;
          }
          .confirmation-box {
            text-align: center;
            max-width: 420px;
          }
          .confirm-icon {
            font-size: 2.25rem;
            display: block;
            margin-bottom: 1rem;
          }
          h1 {
            font-family: "Fraunces", serif;
            color: var(--jv-navy);
            margin: 0 0 0.75rem;
          }
          p {
            color: #4a4335;
            line-height: 1.6;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="jv-submit">
      <section className="hero">
        <p className="eyebrow">Submit a Post</p>
        <h1>Write for Juris Veda</h1>
        <p className="lede">
          Share a note, a case-law breakdown, a blog post, or a recent development. Fill in the
          form below — we review every submission before it goes live.
        </p>
      </section>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && <p className="error" id="fullName-error">{errors.fullName}</p>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p className="error" id="email-error">{errors.email}</p>}
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="postType">Post Type</label>
            <select
              id="postType"
              value={form.postType}
              onChange={(e) => updateField("postType", e.target.value)}
              aria-invalid={Boolean(errors.postType)}
            >
              <option value="">Select a type…</option>
              <option value="blog">Blog</option>
              <option value="recent-development">Recent Development</option>
              <option value="case-note">Case Note</option>
            </select>
            {errors.postType && <p className="error">{errors.postType}</p>}
          </div>

          <div className="field">
            <label htmlFor="subject">Subject / Category</label>
            <select
              id="subject"
              value={form.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              aria-invalid={Boolean(errors.subject)}
            >
              <option value="">Select a subject…</option>
              {subjects.map((s) => (
                <option value={s.id} key={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.subject && <p className="error">{errors.subject}</p>}
          </div>
        </div>

        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && <p className="error" id="title-error">{errors.title}</p>}
        </div>

        <div className="field">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            rows={10}
            value={form.content}
            onChange={(e) => updateField("content", e.target.value)}
            aria-invalid={Boolean(errors.content)}
            aria-describedby={errors.content ? "content-error" : undefined}
          />
          {errors.content && <p className="error" id="content-error">{errors.content}</p>}
        </div>

        <div className="field">
          <label htmlFor="bio">Short Author Bio</label>
          <textarea
            id="bio"
            rows={3}
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            aria-invalid={Boolean(errors.bio)}
            aria-describedby={errors.bio ? "bio-error" : undefined}
          />
          {errors.bio && <p className="error" id="bio-error">{errors.bio}</p>}
        </div>

        <div className="field">
          <label htmlFor="socialLink">Social Link (optional)</label>
          <input
            id="socialLink"
            type="text"
            placeholder="https://linkedin.com/in/…"
            value={form.socialLink}
            onChange={(e) => updateField("socialLink", e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">Submit Post</button>
      </form>

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
        .jv-submit {
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
          max-width: 640px;
          margin: 0 auto;
          padding: 4.5rem 1.5rem 2.5rem;
          text-align: center;
        }
        .hero h1 {
          font-family: "Fraunces", serif;
          color: var(--jv-navy);
          font-size: clamp(1.9rem, 4.5vw, 2.5rem);
          margin: 0 0 1.1rem;
        }
        .lede {
          font-size: 1.02rem;
          line-height: 1.6;
          color: #4a4335;
        }
        .form {
          max-width: 640px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex: 1;
        }
        .field-row {
          display: flex;
          gap: 1.4rem;
        }
        label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--jv-navy);
        }
        input,
        select,
        textarea {
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          padding: 0.7rem 0.9rem;
          border: 1px solid var(--jv-parchment-dark);
          border-radius: 6px;
          background: #fff;
          color: var(--jv-ink);
          resize: vertical;
        }
        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible {
          outline: 3px solid var(--jv-gold);
          outline-offset: 1px;
        }
        input[aria-invalid="true"],
        select[aria-invalid="true"],
        textarea[aria-invalid="true"] {
          border-color: var(--jv-maroon);
        }
        .error {
          color: var(--jv-maroon);
          font-size: 0.8rem;
          margin: 0;
        }
        .submit-button {
          align-self: flex-start;
          background: var(--jv-gold);
          color: var(--jv-navy);
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          padding: 0.85rem 2.2rem;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background 0.2s ease;
        }
        .submit-button:hover {
          background: var(--jv-gold-light);
        }
        .submit-button:focus-visible {
          outline: 3px solid var(--jv-navy);
          outline-offset: 2px;
        }
        @media (max-width: 560px) {
          .field-row {
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
}
