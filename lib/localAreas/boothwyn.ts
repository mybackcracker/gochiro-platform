import type { LocalAreaContent } from "./types";
import { LAPTOP_CONSULTATION_IMAGE, DOCTOR_PORTRAIT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const boothwyn: LocalAreaContent = {
  slug: "boothwyn",
  town: "Boothwyn",

  metaTitle: "Mobile Chiropractor in Boothwyn, PA — GoChiroMobile",
  metaDescription:
    "In-home chiropractic care in Boothwyn and Upper Chichester, PA from Dr. David DeFries, a longtime resident of the area, also serving Lower Chichester, Trainer and Marcus Hook.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Boothwyn, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in Boothwyn and Upper Chichester.",
  heroParagraphs: [
    "GoChiroMobile provides mobile chiropractic care in Boothwyn and Upper Chichester, Pennsylvania, along Chichester Avenue and Route 322, also reaching Lower Chichester, Trainer and Marcus Hook.",
    "Every visit is provided by Dr. David DeFries, a licensed Doctor of Chiropractic, who brings evaluation and treatment directly to your home or workplace rather than requiring a trip to an office.",
  ],
  heroImage: LAPTOP_CONSULTATION_IMAGE,
  heroCta: "Book a Chiropractic Visit in Boothwyn",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Most patients are dealing with something specific — low back pain, sciatica, neck pain, sore shoulders, or stiffness that's limiting how they move. The aim of every visit is the same: better movement, restored function, and less day-to-day interference from the problem.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Because the visit comes to you in Boothwyn or Upper Chichester, care fits around work and family instead of competing with them.",

  connectionHeading: "A Longtime Resident of the Boothwyn Area",
  connectionParagraphs: [
    "Dr. DeFries is a longtime resident of the Boothwyn/Upper Chichester area. Before moving to the mobile model that became GoChiroMobile, he practiced in Boothwyn for approximately 15 years.",
    "That local familiarity carries directly into the mobile practice — care built around the same community he has lived and practiced in, now brought to the patient's own home or workplace.",
  ],
  connectionImage: DOCTOR_PORTRAIT_IMAGE,

  howItWorksHeading: "How In-Home Chiropractic Care Works in Boothwyn",
  howItWorksIntro:
    "Practical, mobile convenience is central to how a Boothwyn visit works — the same three steps as every GoChiroMobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Choose your visit and an available appointment time — your address and exact price are confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries brings the table and equipment needed for a complete visit to your home or workplace, with no drive of your own required.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Your visit includes appropriate evaluation and treatment at your location, with no waiting room to sit in.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients begin with a full evaluation, so care reflects what's actually found rather than a fixed routine. Returning patients continue care shaped by their history and how they've responded to treatment.",
    "Because travel is part of a mobile visit, pricing depends on your location — your exact price is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling Convenience in Boothwyn",
  schedulingParagraphs: [
    "A mobile visit removes the drive and waiting room from the equation entirely, which is often the most practical benefit for patients throughout Boothwyn, Upper Chichester and the surrounding communities.",
    "When you schedule, exact appointment times are confirmed based on real-time availability for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Boothwyn",
  workplaceParagraphs: [
    "Group Visits bring wellness-focused chiropractic care directly to a workplace or other single location for two or more people at once — a practical option for employers in the Boothwyn area.",
    "Group Visits focus on wellness-focused care, not acute injuries or complex new complaints. Each participant is priced individually, plus a single travel fee for the whole group, with full details confirmed during scheduling.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to Boothwyn and Upper Chichester, GoChiroMobile visits Lower Chichester, Trainer, Marcus Hook and other nearby communities. If you're nearby but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Aston", href: "/service-areas/aston" },
    { label: "Brookhaven", href: "/service-areas/brookhaven" },
    "Lower Chichester",
    "Trainer",
    "Marcus Hook",
  ],

  closingHeading: "Looking for chiropractic care in Boothwyn or a surrounding area?",
};
