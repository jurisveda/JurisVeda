/*
  FILE: team-data.js

  WHERE THIS GOES:
    App Router  -> app/data/team-data.js   (or lib/team-data.js — anywhere importable)
    Pages Router -> lib/team-data.js       (or data/team-data.js)

  Import it wherever you need it, e.g.:
    import { founder, teamMembers } from "../data/team-data";      // Pages Router
    import { founder, teamMembers } from "@/app/data/team-data";   // App Router (if "@/*" alias is set)

  WHAT TO EDIT:
    - Replace the placeholder bio, photo path, and social links for `founder`.
    - Add/remove objects inside `teamMembers` for each contributor.
    - Photo paths currently point to /public/images/team/... — drop matching
      image files into your /public/images/team/ folder, or swap in real URLs.
*/

export const founder = {
  name: "Anuraj Sharma",
  role: "Founder & Editor-in-Chief",
  bio: "Anuraj founded Juris Veda in 2025 while in his final year of law school, after realising how scattered and inconsistent good subject notes and case-law summaries were for Indian law students. Juris Veda is his attempt to build the resource he wished he'd had on day one — clear, exam-ready, and written by students who've actually sat the exams.",
  photo: "/images/team/founder.jpg",
  linkedin: "https://linkedin.com/in/your-handle",
  instagram: "https://instagram.com/jurisveda",
};

export const teamMembers = [
  {
    name: "Ishita Verma",
    role: "Editor, Constitutional Law",
    bio: "Third-year law student with a focus on constitutional interpretation and comparative federalism. Coordinates the Constitutional Law desk.",
    photo: "/images/team/ishita-verma.jpg",
    linkedin: "https://linkedin.com/in/example-ishita",
    instagram: "",
  },
  {
    name: "Rohan Malhotra",
    role: "Editor, Corporate & Commercial Law",
    bio: "Interned with two corporate law firms and writes primarily on company law, M&A, and contract drafting fundamentals.",
    photo: "/images/team/rohan-malhotra.jpg",
    linkedin: "https://linkedin.com/in/example-rohan",
    instagram: "https://instagram.com/example-rohan",
  },
  {
    name: "Meher Kaur",
    role: "Contributor, Criminal Law",
    bio: "Moot court enthusiast with a keen interest in criminal procedure and evidence law. Writes case-law breakdowns for the CrPC desk.",
    photo: "/images/team/meher-kaur.jpg",
    linkedin: "",
    instagram: "https://instagram.com/example-meher",
  },
];
