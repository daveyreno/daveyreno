import type { Metadata } from "next";
import Footer from "@/components/common/Footer";
import Reveal from "@/components/site/Reveal";
import RoleEntry from "@/components/site/RoleEntry";
import { HITS, SIDE } from "@/lib/roles";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Product work across AI, AeroTech, FinTech, ConTech and LegalTech. rememberr, SupaDrone, Soar, Lendi, Cranetime, LEGALNET, Crazy Domains and Bookables.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <section className="shell pb-[clamp(3rem,8vh,5rem)] pt-[clamp(4rem,14vh,9rem)]">
        <Reveal>
          <p className="label rise">Experience</p>
          <h1
            className="d1 rise mt-6 max-w-[13ch]"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            Greatest hits.
          </h1>
          {/* Three lines, always: hard breaks rather than a max-width that
              happens to wrap here and not on the next screen size. AI gets its
              own line because it is not another sector on the list, it is how
              the recent work got built. */}
          <p
            className="lede rise mt-8"
            style={{ "--d": "170ms" } as React.CSSProperties}
          >
            Seven companies, three acquisitions, and one cheeky side gig.
            <br />
            Tech infra, construction, law, finance and aerospace.
            <br />
            AI running through all of it now.
          </p>
        </Reveal>
      </section>

      <div className="plate">
        <div className="shell">
          {HITS.map((role) => (
            <RoleEntry key={role.id} role={role} />
          ))}

          <Reveal className="rule-top pt-10">
            <p className="label rise">Side gig</p>
          </Reveal>

          {SIDE.map((role) => (
            <RoleEntry key={role.id} role={role} />
          ))}
          <Footer className="mt-[var(--stack)] mb-10" />
        </div>
      </div>
    </>
  );
}
