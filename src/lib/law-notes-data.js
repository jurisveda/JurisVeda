/*
  FILE: law-notes-data.js

  WHERE THIS GOES:
    App Router   -> app/data/law-notes-data.js  (or lib/law-notes-data.js)
    Pages Router -> lib/law-notes-data.js        (or data/law-notes-data.js)

  Import it wherever you need it, e.g.:
    import { subjects, getSubjectById } from "../data/law-notes-data";      // Pages Router
    import { subjects, getSubjectById } from "@/app/data/law-notes-data";   // App Router

  THIS FILE POWERS:
    - /law-notes            (folder grid of subjects)
    - /law-notes/[subject]  (entries for one subject)
    - Blog and Recent Development subject tags (they reuse `color`/`icon`
      by looking up the subject id, so the badge colour stays identical
      everywhere that subject's content appears — this is the one visual
      thread tying the whole site together, so keep it centralised here.)

  WHAT TO EDIT:
    - Add real notes/case-law entries inside each subject's `entries` array.
    - `content` can be a plain string (rendered as body text) OR a URL
      string starting with "http" (rendered as a "Read full note" link) —
      the components below handle both automatically.
    - Feel free to add more subjects; just give each a unique `id` slug.
*/

export const subjects = [
  {
    id: "constitutional-law",
    name: "Constitutional Law",
    color: "#8B2635",
    icon: "⚖️",
    entries: [
      {
        title: "Doctrine of Basic Structure — A Working Summary",
        type: "note",
        topic: "Basic Structure Doctrine",
        summary:
          "Traces the doctrine from Golak Nath through Kesavananda Bharati to its present-day application, with a quick-reference list of what has been held to be 'basic'.",
        date: "2026-01-14",
        content:
          "Placeholder body text — replace with the full note. Cover: origin in Golak Nath (1967), the 13-judge bench in Kesavananda Bharati (1973), the amendability of Article 368, and post-1973 applications such as Minerva Mills and Indira Gandhi v. Raj Narain.",
      },
      {
        title: "Kesavananda Bharati v. State of Kerala (1973)",
        type: "case-law",
        topic: "Basic Structure Doctrine",
        summary:
          "The 13-judge bench decision that carved out the basic structure doctrine, limiting Parliament's amending power under Article 368.",
        date: "2026-02-02",
        content:
          "Placeholder case brief — replace with facts, issues, holding, and ratio decidendi.",
      },
      {
        title: "Article 21 and the Expanding Right to Life",
        type: "note",
        topic: "Fundamental Rights",
        summary:
          "How judicial interpretation widened 'life and personal liberty' from Maneka Gandhi onward to include privacy, dignity, and a clean environment.",
        date: "2026-02-20",
        content: "Placeholder body text — replace with the full note.",
      },
    ],
  },
  {
    id: "criminal-law",
    name: "Criminal Law",
    color: "#3D5A80",
    icon: "🔒",
    entries: [
      {
        title: "General Exceptions Under BNS — Chapter Overview",
        type: "note",
        topic: "General Exceptions",
        summary:
          "A clause-by-clause walkthrough of the general exceptions chapter, mapped against the corresponding IPC sections for quick cross-reference.",
        date: "2026-01-08",
        content: "Placeholder body text — replace with the full note.",
      },
      {
        title: "State of Maharashtra v. M.H. George",
        type: "case-law",
        topic: "Mens Rea",
        summary:
          "Landmark case on strict liability offences and the limited role of mens rea in regulatory/economic offences.",
        date: "2026-01-25",
        content: "Placeholder case brief — replace with facts, issues, holding, and ratio.",
      },
    ],
  },
  {
    id: "civil-law",
    name: "Civil Law",
    color: "#2F5233",
    icon: "📜",
    entries: [
      {
        title: "Essentials of a Valid Contract — Quick Reference",
        type: "note",
        topic: "Contract Formation",
        summary:
          "Offer, acceptance, consideration, capacity, and free consent — the five checkpoints examiners expect you to run through in every problem question.",
        date: "2026-01-11",
        content: "Placeholder body text — replace with the full note.",
      },
      {
        title: "Lalman Shukla v. Gauri Dutt",
        type: "case-law",
        topic: "Offer & Acceptance",
        summary:
          "Classic case on the requirement of knowledge of an offer for a valid acceptance to arise.",
        date: "2026-02-05",
        content: "Placeholder case brief — replace with facts, issues, holding, and ratio.",
      },
    ],
  },
  {
    id: "family-law",
    name: "Family Law",
    color: "#A0522D",
    icon: "👪",
    entries: [
      {
        title: "Grounds for Divorce Across Personal Laws — Comparison Table",
        type: "note",
        topic: "Matrimonial Remedies",
        summary:
          "Side-by-side comparison of divorce grounds under the Hindu Marriage Act, Special Marriage Act, and Muslim personal law.",
        date: "2026-01-19",
        content: "Placeholder body text — replace with the full note.",
      },
      {
        title: "Shah Bano Begum v. Mohd. Ahmed Khan",
        type: "case-law",
        topic: "Maintenance",
        summary:
          "Landmark ruling on a Muslim woman's right to maintenance under Section 125 CrPC beyond the iddat period.",
        date: "2026-02-11",
        content: "Placeholder case brief — replace with facts, issues, holding, and ratio.",
      },
    ],
  },
  {
    id: "corporate-law",
    name: "Corporate Law",
    color: "#1F6F6F",
    icon: "🏢",
    entries: [
      {
        title: "Types of Companies Under the Companies Act, 2013",
        type: "note",
        topic: "Company Formation",
        summary:
          "Private, public, one-person, and Section 8 companies — key distinctions, minimum requirements, and common exam traps.",
        date: "2026-01-06",
        content: "Placeholder body text — replace with the full note.",
      },
      {
        title: "Salomon v. A. Salomon & Co. Ltd.",
        type: "case-law",
        topic: "Corporate Veil",
        summary:
          "The foundational case establishing a company's separate legal personality, distinct from its shareholders.",
        date: "2026-01-29",
        content: "Placeholder case brief — replace with facts, issues, holding, and ratio.",
      },
    ],
  },
  {
    id: "ipr",
    name: "IPR",
    color: "#6B3FA0",
    icon: "💡",
    entries: [
      {
        title: "Trademark Infringement vs. Passing Off — What's the Difference?",
        type: "note",
        topic: "Trademarks",
        summary:
          "A plain-English breakdown of when a claim lies in statutory infringement versus common-law passing off, with the tests courts apply.",
        date: "2026-01-16",
        content: "Placeholder body text — replace with the full note.",
      },
      {
        title: "Novartis AG v. Union of India",
        type: "case-law",
        topic: "Patents",
        summary:
          "Section 3(d) of the Patents Act and the rejection of Novartis's patent claim over Glivec on grounds of 'evergreening'.",
        date: "2026-02-08",
        content: "Placeholder case brief — replace with facts, issues, holding, and ratio.",
      },
    ],
  },
  {
    id: "jurisprudence",
    name: "Jurisprudence",
    color: "#8C6A3F",
    icon: "📚",
    entries: [
      {
        title: "Austin, Hart, and Kelsen — Three Theories of Law, Compared",
        type: "note",
        topic: "Legal Theory",
        summary:
          "A comparison table of the command theory, the rule of recognition, and the Grundnorm — useful for both essay and short-answer questions.",
        date: "2026-01-22",
        content: "Placeholder body text — replace with the full note.",
      },
    ],
  },
  {
    id: "cpc-crpc",
    name: "CPC / CrPC",
    color: "#4A6FA5",
    icon: "⚙️",
    entries: [
      {
        title: "Res Judicata Under Section 11 CPC — Conditions Checklist",
        type: "note",
        topic: "Res Judicata",
        summary:
          "The five conditions that must be satisfied for a matter to be barred by res judicata, with common fact-pattern examples.",
        date: "2026-01-30",
        content: "Placeholder body text — replace with the full note.",
      },
      {
        title: "Anticipatory Bail Under Section 438 CrPC — Procedure Note",
        type: "note",
        topic: "Bail",
        summary:
          "Step-by-step procedure and key factors courts weigh when deciding anticipatory bail applications.",
        date: "2026-02-14",
        content: "Placeholder body text — replace with the full note.",
      },
    ],
  },
  {
    id: "evidence-law",
    name: "Evidence Law",
    color: "#722F37",
    icon: "🔍",
    entries: [
      {
        title: "Dying Declaration — Evidentiary Value and Exceptions",
        type: "note",
        topic: "Dying Declaration",
        summary:
          "Section 32 of the Evidence Act, judicial standards for reliability, and when corroboration is required.",
        date: "2026-01-27",
        content: "Placeholder body text — replace with the full note.",
      },
      {
        title: "Selvi v. State of Karnataka",
        type: "case-law",
        topic: "Confessions & Testimony",
        summary:
          "On the involuntary administration of narco-analysis, polygraph, and BEAP tests, and their conflict with Article 20(3).",
        date: "2026-02-18",
        content: "Placeholder case brief — replace with facts, issues, holding, and ratio.",
      },
    ],
  },
];

export function getSubjectById(id) {
  return subjects.find((s) => s.id === id);
}
