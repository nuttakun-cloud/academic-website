import type { Profile } from "@/types";

// =============================================================================
// PROFILE DATA
// แก้ไขข้อมูลของคุณที่นี่ — ไฟล์เดียวอัปเดตทุกส่วนของเว็บ
// =============================================================================

export const profile: Profile = {
  name:        "Professor Jane Smith",
  title:       "Professor of Computational Biology",
  institution: "University of Edinburgh",
  department:  "School of Biological Sciences",
  email:       "j.smith@university.ac.uk",
  officeHours: "Tuesday 14:00–16:00 · Thursday 10:00–12:00",
  officeLocation: "Ashworth Laboratories, Room 4.02",
  photo:       "/images/profile.jpg",
  cv:          "/files/cv.pdf",

  bio: [
    "I am a Professor of Computational Biology at the University of Edinburgh, " +
    "where I lead the Genomic Data Science Laboratory. My research sits at the " +
    "intersection of machine learning and genomics, with a particular focus on " +
    "developing computational tools for early disease detection.",

    "Before joining Edinburgh, I was a Postdoctoral Fellow at the Broad Institute " +
    "of MIT and Harvard. I completed my PhD in Bioinformatics at MIT in 2010 " +
    "under the supervision of Professor John Doe.",

    "I am currently accepting PhD students and postdoctoral researchers. " +
    "Please see the Contact page for details on how to apply.",
  ],

  researchInterests: [
    "Genomic Data Analysis",
    "Machine Learning in Diagnostics",
    "Population Genetics",
    "Computational Pathology",
    "Cancer Genomics",
    "Biomarker Discovery",
  ],

  education: [
    {
      degree:      "PhD Bioinformatics",
      institution: "Massachusetts Institute of Technology",
      year:        "2010",
      thesis:      "Computational methods for large-scale genomic variant analysis",
    },
    {
      degree:      "MSc Computational Science",
      institution: "University of Oxford",
      year:        "2006",
    },
    {
      degree:      "BSc Biology",
      institution: "University of Edinburgh",
      year:        "2004",
    },
  ],

  positions: [
    {
      title:       "Professor of Computational Biology",
      institution: "University of Edinburgh",
      period:      "2018–present",
    },
    {
      title:       "Associate Professor",
      institution: "University of Leeds",
      period:      "2014–2018",
    },
    {
      title:       "Postdoctoral Research Fellow",
      institution: "Broad Institute, MIT & Harvard",
      period:      "2010–2014",
    },
  ],

  awards: [
    { year: "2024", title: "Fellow of the Royal Society" },
    { year: "2022", title: "ERC Consolidator Grant" },
    { year: "2019", title: "ISCB Outstanding Contribution Award" },
    { year: "2017", title: "Wellcome Trust Senior Research Fellowship" },
  ],

  social: [
    {
      platform: "google-scholar",
      url:      "https://scholar.google.com/citations?user=YOURID",
      label:    "Google Scholar",
    },
    {
      platform: "orcid",
      url:      "https://orcid.org/0000-0000-0000-0000",
      label:    "ORCID",
    },
    {
      platform: "github",
      url:      "https://github.com/janesmith",
      label:    "GitHub",
    },
    {
      platform: "email",
      url:      "mailto:j.smith@university.ac.uk",
      label:    "Email",
    },
  ],
};
