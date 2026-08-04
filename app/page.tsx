import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/common/Footer";
import Contact from "@/components/site/Contact";
import JsonLd from "@/components/site/JsonLd";
import Reveal from "@/components/site/Reveal";
import { profilePageGraph } from "@/lib/schema";

/** Title and description are inherited from the root layout defaults. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Home is one locked viewport: the field, the claim, and a way to reach him.
 * Nothing scrolls. The evidence lives on /experience, and sending a recruiter
 * there is a stronger move than summarising it twice.
 */

/** Standing facts, in the register of a printed index. */
const STANDING = [
  { k: "Currently", v: ["Head of Product", "at rememberr"] },
  { k: "Based", v: ["Perth, Australia", "Remote-fluent"] },
];

export default function Home() {
  return (
    <>
    <JsonLd data={profilePageGraph} />
    <section className="shell flex flex-1 flex-col justify-between pb-[clamp(1.5rem,4vh,2.5rem)] pt-[clamp(2.5rem,7vh,5rem)]">
      <Reveal className="grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-2xl">
        {STANDING.map((col, i) => (
          <div key={col.k} className="rise" style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
            <p className="label">{col.k}</p>
            <div className="mt-3 space-y-0.5">
              {col.v.map((line) => (
                <p key={line} className="text-[0.9375rem] leading-snug text-[var(--ink)]">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </Reveal>

      {/* Hero and the closing row travel together as one bottom-anchored block,
          so all the flexible space in the viewport sits above them. */}
      <div className="mt-[clamp(3rem,14vh,10rem)]">
      <Reveal>
        <h1 className="d1 rise max-w-[15ch]">I deliver value. Fast.</h1>
        <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <p className="lede rise max-w-[64ch]" style={{ "--d": "160ms" } as React.CSSProperties}>
            Seventeen years across AI, fintech, construction and law.
            Six companies, three acquisitions. I discover, prototype, and drive
            engineering. Sometimes I deploy it myself.
          </p>
          <div
            className="rise flex shrink-0 items-center gap-6"
            style={{ "--d": "260ms" } as React.CSSProperties}
          >
            <Contact className="label group inline-flex items-center gap-4 border border-[var(--rule-strong)] px-6 py-4 text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[#060608]">
              <span>Get in touch</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Contact>
            <Link href="/experience" className="label label--bright transition-colors hover:text-[var(--ink)]">
              See the work
            </Link>
          </div>
        </div>
      </Reveal>

      <Footer className="mt-[clamp(1.25rem,3vh,2rem)]" />
      </div>
    </section>
    </>
  );
}
