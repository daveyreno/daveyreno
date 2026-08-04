import type { RoleId } from "./field";

export type Role = {
  id: RoleId;
  name: string;
  title: string;
  /** Display span, e.g. "Since 2026". */
  span: string;
  /** Sort key for the spectrum: start year. */
  from: number;
  to: number | null;
  sector: string;
  tags: string[];
  /** The one line a recruiter remembers. Drawn from the body, never invented. */
  headline: string;
  body: string[];
  logo: { src: string; width: number; height: number; invert?: boolean };
  /** Full CSS background for the role's panel. Carried over from the original site. */
  gradient: string;
  /**
   * Per-logo max width, ported from the hand-tuned values on the original site.
   * A shared cap cannot equalise marks that range from a 6:1 wordmark to a
   * near-square badge, so each one gets its own optical size.
   */
  logoMax: string;
  /** Live site, where one exists. Linked from the name with no visible affordance. */
  url?: string;
  /** "Greatest Hits" or "Side Gig", preserved from the incumbent site. */
  group: "hits" | "side";
};

export const ROLES: Role[] = [
  {
    id: "rememberr",
    name: "rememberr",
    title: "Head of Product",
    span: "Since 2026",
    from: 2026,
    to: null,
    sector: "AI",
    tags: ["AI", "SaaS", "0 to 1", "Startup"],
    headline: "AI that catches the commitments you make and forget.",
    body: [
      "I own product strategy and roadmap for an engine that pulls tasks out of email, Slack and live meetings. Every prototype gets designed and tested with discovery users before we build a line of it.",
      "I go deep on the build, not just the spec: working with our engineers on the LangChain extraction pipeline, building iMessage as the first interaction layer so people could manage tasks by conversation, and writing the eval systems that keep extraction accuracy honest. Discovery runs on user interviews and PostHog rather than assumptions. I built the marketing site too.",
    ],
    logo: { src: "/rememberr-white.svg", width: 2444, height: 400 },
    url: "https://rememberr.ai/",
    gradient:
      "radial-gradient(118% 96% at 22% 14%, #22D3EE 0%, rgba(34,211,238,0) 60%), linear-gradient(135deg, #0BA6C9 0%, #0A5C8F 52%, #08203A 100%)",
    logoMax: "clamp(200px, 23vw, 300px)",
    group: "hits",
  },
  {
    id: "soar",
    name: "Soar",
    title: "Head of Product",
    span: "2025",
    from: 2025,
    to: 2025,
    sector: "FinTech",
    tags: ["FinTech", "Retail Mortgages", "Enterprise"],
    headline: "A new way to crowdfund home loans in Saudi Arabia.",
    body: [
      "A greenfield fintech with a fuzzy idea and no clear path to revenue. I turned it into a strategy the founders and investors could actually agree on, then designed the investment pool model that sat underneath it.",
      "I prototyped the full app to win buy-in before we spent a cent of engineering time. From there came an automated finance decision engine with KYC and AML built in, agile roadmapping for teams that had never worked that way, and four product squads led through build and toward regulator approval.",
    ],
    logo: { src: "/soar-inc-logo.svg", width: 160, height: 60, invert: true },
    gradient:
      "radial-gradient(116% 94% at 78% 18%, #8FA6BD 0%, rgba(143,166,189,0) 60%), linear-gradient(215deg, #3E5164 0%, #24323F 52%, #10171F 100%)",
    logoMax: "clamp(118px, 13vw, 168px)",
    group: "hits",
  },
  {
    id: "lendi",
    name: "Lendi",
    title: "Senior Product Manager",
    span: "2022–2025",
    from: 2022,
    to: 2025,
    sector: "FinTech",
    tags: ["Enterprise", "Home Loans", "Data Analytics", "Infosec"],
    headline: "4m customers and 1,300 brokers, migrated onto one platform.",
    body: [
      "I joined mid-merger, as Lendi and Aussie Home Loans became a single business. I led the migration onto a new microservice platform, then was promoted to run an eleven-person cross-functional squad.",
      "The wins: broker pre-routing links that brought in more than 1,200 customers at zero acquisition cost, an AI chat assistant turning site visitors into roughly 100 bookings a day, a 6% lift in account creation from A/B testing the auth flow in Amplitude and FullStory, and an industry-first PEXA settlement integration that hands brokers back over 10,000 hours a month.",
    ],
    logo: { src: "/lendi-logo.svg", width: 300, height: 200 },
    gradient:
      "radial-gradient(120% 98% at 18% 84%, #34D399 0%, rgba(52,211,153,0) 60%), linear-gradient(45deg, #059669 0%, #05543E 52%, #04201C 100%)",
    logoMax: "clamp(168px, 19vw, 248px)",
    group: "hits",
  },
  {
    id: "cranetime",
    name: "Cranetime",
    title: "Product Manager",
    span: "2017–2022",
    from: 2017,
    to: 2022,
    sector: "ConTech",
    tags: ["ConTech", "Startup", "Customer Centric"],
    headline: "The scheduling backbone for $20bn+ of live construction.",
    body: [
      "A founder, one engineer and me. We shipped an MVP, and it grew into the system running more than 200 construction sites. Acquired in 2022.",
      "The differentiators came from standing on sites watching crews work rather than sitting in planning sessions: live-site boards, predictive weather rescheduling, collision detection. Mirvac and Laing O’Rourke signed on.",
    ],
    logo: { src: "/cranetime-logo.svg", width: 300, height: 200 },
    gradient:
      "radial-gradient(116% 94% at 76% 16%, #60A5FA 0%, rgba(96,165,250,0) 60%), linear-gradient(160deg, #2563EB 0%, #1B3A87 52%, #0A1740 100%)",
    logoMax: "clamp(168px, 19vw, 248px)",
    group: "hits",
  },
  {
    id: "legalnet",
    name: "LEGALNET",
    title: "Product Manager",
    span: "2013–2017",
    from: 2013,
    to: 2017,
    sector: "LegalTech",
    tags: ["Law", "Lead Generation", "CRM", "Startup"],
    headline: "Employee number three. Built the product and the demand.",
    body: [
      "A legal lead-generation marketplace. I built the website and a bespoke CRM, then built the demand to run through it: SEO and AdWords from scratch, taking lead flow from nothing to around three consultations a day across seven lawyers.",
      "Then I went after conversion, with better scripts, automated nurturing, and interfaces designed around how lawyers actually work rather than how the software wanted them to. The team grew from three to eight. Acquired in 2017.",
    ],
    logo: { src: "/legalnet-logo.svg", width: 300, height: 200 },
    gradient:
      "radial-gradient(118% 96% at 80% 80%, #C084FC 0%, rgba(192,132,252,0) 60%), linear-gradient(315deg, #9333EA 0%, #5B1E92 52%, #240B3B 100%)",
    logoMax: "clamp(168px, 19vw, 248px)",
    group: "hits",
  },
  {
    id: "crazydomains",
    name: "Crazy Domains",
    title: "Project Manager",
    span: "2009–2014",
    from: 2009,
    to: 2014,
    sector: "Infra",
    tags: ["Web Services", "Growth", "Startup"],
    headline: "Five people to three hundred, and a $150k/month ad budget.",
    body: [
      "I joined Dreamscape Networks, the company behind Crazy Domains, when it was five people, and helped scale it into Australia’s largest domain and hosting provider. It was later acquired by Web.com.",
      "The part I am proudest of is a website-building academy that answered a real skills shortage and delivered hundreds of SME websites across Perth, some worth $150k each. Technical execution, sales and team building, all at once. It is what led me into product.",
    ],
    logo: { src: "/crazydomains-logo.svg", width: 300, height: 200 },
    gradient:
      "radial-gradient(114% 94% at 24% 16%, #F2453D 0%, rgba(242,69,61,0) 60%), linear-gradient(120deg, #C11B1B 0%, #7F1010 52%, #2A0606 100%)",
    logoMax: "clamp(168px, 19vw, 248px)",
    group: "hits",
  },
  {
    id: "bookables",
    name: "Bookables",
    title: "Founder",
    span: "Side Gig",
    from: 2025,
    to: null,
    sector: "SaaS",
    tags: ["SaaS", "Bookings", "Payments", "Solo Build"],
    headline: "A labour of love.",
    body: [
      "A booking and business platform: scheduling, quoting, invoicing, payments, CRM and messaging, for businesses that take bookings. 60+ releases in the first two months.",
      "I built this one because I wanted to build it. I do the product, the design and the engineering, and seeing more businesses pick it up has been the best part.",
    ],
    logo: { src: "/bookables-light.svg", width: 2634, height: 365 },
    url: "https://www.bookables.com.au/",
    gradient:
      "radial-gradient(120% 96% at 78% 82%, #FB923C 0%, rgba(251,146,60,0) 60%), linear-gradient(20deg, #C2410C 0%, #6B2308 52%, #180801 100%)",
    logoMax: "clamp(200px, 23vw, 300px)",
    group: "side",
  },
];

export const HITS = ROLES.filter((r) => r.group === "hits");
export const SIDE = ROLES.filter((r) => r.group === "side");
export const roleById = (id: string) => ROLES.find((r) => r.id === id);
