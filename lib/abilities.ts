export type Discipline = {
  name: string;
  /** Depth in this discipline. The user's own framing, kept deliberately. */
  level: string;
  /** 0..1 — drives the hairline meter only; the words above are the real claim. */
  depth: number;
  body: string[];
};

export const DISCIPLINES: Discipline[] = [
  {
    name: "Product",
    level: "Master",
    depth: 0.98,
    body: [
      "Seventeen years of it, from three-person startups to businesses serving millions of customers. The pattern holds at every size: ship something real, watch how it actually gets used, and let that settle the argument.",
      "I have cancelled more than I have shipped. Killing work that is not moving a number is the same muscle as backing work that is, and it is the one most teams never build.",
      "I have also built things that did not work. That is the job. What matters is noticing early and being honest about it while there is still time to turn.",
    ],
  },
  {
    name: "Design",
    level: "Advanced",
    depth: 0.85,
    body: [
      "Photoshop, then Figma, now working React prototypes. I have built full design systems from the tokens up, and I would rather hand someone something they can click than a screen they have to imagine.",
      "I was the only PM and the only designer at a startup, which cured me of treating design as decoration. Every choice had to survive a business conversation the same afternoon.",
      "Doing both means no handoff, no translation loss, and a much shorter path from a problem to something in front of a user.",
    ],
  },
  {
    name: "Engineering",
    level: "Proficient",
    depth: 0.75,
    body: [
      "Next.js and Supabase are what I reach for, though I am familiar with plenty of other frameworks. I built Bookables end to end, and this site with it, mostly at night.",
      "Reading the code changes the conversation. I can tell what is genuinely hard from what merely sounds hard, so scope conversations start from the same understanding.",
      "It also means my estimates are grounded in something other than optimism, and my prototypes are close enough to real that the answers they give are worth having.",
    ],
  },
];

export type Play = { title: string; body: string };

export const PLAYBOOK: Play[] = [
  {
    title: "Customer Focus",
    body: "Watch people work instead of asking them what they want. The gap between what they say and what they do is where the product is.",
  },
  {
    title: "Deep Analysis",
    body: "Understand the problem before you solve it. Most product failures are a problem nobody understood properly, not a solution built badly.",
  },
  {
    title: "Experimentation",
    body: "Test the assumption before you fund it. A prototype or a fake door often answers the question a quarter of engineering would have. Fail cheap, learn expensive.",
  },
  {
    title: "Objectives & Metrics",
    body: "Name the number that has to move before you start. If you cannot, you are not ready to build, you are ready to have another meeting.",
  },
  {
    title: "Ruthless Prioritisation",
    body: "You cannot build everything, and good ideas still have to wait. What you cut shapes the product more than what you ship.",
  },
  {
    title: "Communication",
    body: "Explain the why, not just the what. Almost every mess I have inherited was a communication failure that was given time to compound.",
  },
  {
    title: "Stakeholder Journeys",
    body: "Bring people in early enough that their input can still change the outcome. Feedback you were never going to act on manufactures blockers, not advocates.",
  },
  {
    title: "Keep it simple, stupid",
    body: "Complicated systems should still feel simple to use. If people need training to get value, that is a design failure, not a user failure.",
  },
  {
    title: "Delivery",
    body: "Small, fast cycles, and phases you can actually read. Waterfall does not fail at the end, it just waits until the end to tell you.",
  },
  {
    title: "Strive For Better",
    body: "Push hardest when things are working, not only when they break. Everything that works today has a shelf life.",
  },
];
