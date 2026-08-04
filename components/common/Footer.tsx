import Reveal from "@/components/site/Reveal";
import { PROFILES } from "@/lib/site";

/* No email address anywhere on the site — the contact panel is the only route in.
   These are the same two links the structured data emits as `sameAs`, read from
   one place so the claim and the link can never disagree. */
const ELSEWHERE = PROFILES;

/**
 * One footer, identical on every page.
 *
 * Renders the row only, with no shell of its own, so the caller controls
 * horizontal rhythm — home places it inside its locked viewport, the inner
 * pages inside their own shell. Contact lives in the sticky header on every
 * page, so the footer carries no call to action of its own.
 */
export default function Footer({ className }: { className?: string }) {
  return (
    <Reveal
      as="footer"
      className={`border-t border-[var(--rule)] pt-5 ${className ?? ""}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <p className="label rise">©2026</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {ELSEWHERE.map((l, i) => (
            <li key={l.label}>
              <a
                className="label rise transition-colors hover:text-[var(--ink)]"
                style={{ "--d": `${60 + i * 60}ms` } as React.CSSProperties}
                href={l.href}
                target="_blank"
                // rel="me": the machine-readable half of the sameAs claim in the
                // structured data — this end of the link confirming it too.
                rel="me noopener noreferrer"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
