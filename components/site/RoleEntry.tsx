"use client";

import Image from "next/image";
import type { Role } from "@/lib/roles";
import Reveal from "@/components/site/Reveal";
import { useFieldFocus } from "@/components/visual/CareerField";

/**
 * A role is a spread: a narrow sticky rail on the left carrying the metadata,
 * and on the right the brand's own gradient block with its logo, the argument
 * running underneath it.
 *
 * The rail is sticky so the company you are reading about stays named for the
 * whole length of its section, however far the copy runs.
 */
export default function RoleEntry({ role }: { role: Role }) {
  const focusProps = useFieldFocus(role.id);

  return (
    <Reveal as="section" className="scroll-mt-28">
      <article
        id={role.id}
        {...focusProps}
        className="grid items-start gap-8 border-t border-[var(--rule)] py-[clamp(2.5rem,6vh,4.5rem)] lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-14"
      >
        {/* --------------------------------------------------------- left rail */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="label rise">{role.span}</p>

          {/* Linked where the product is live, with no visual affordance by
              request: identical to an unlinked name. Keyboard users still get
              the global focus ring, so it is reachable even though it is not
              advertised. */}
          <h2
            className="rise mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.02] tracking-[-0.04em] [overflow-wrap:anywhere]"
            style={{ "--d": "60ms" } as React.CSSProperties}
          >
            {role.url ? (
              <a
                href={role.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-inherit no-underline"
              >
                {role.name}
              </a>
            ) : (
              role.name
            )}
          </h2>

          <p
            className="rise mt-2 text-[1.0625rem] text-[var(--ink-dim)]"
            style={{ "--d": "100ms" } as React.CSSProperties}
          >
            {role.title}
          </p>

          <ul
            className="rise mt-5 flex flex-wrap gap-2"
            style={{ "--d": "140ms" } as React.CSSProperties}
          >
            {role.tags.map((t) => (
              <li key={t} className="label border border-[var(--rule)] px-2.5 py-1.5">
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------ block + copy */}
        <div>
          <div
            className="rise relative flex aspect-[16/9] items-center justify-center overflow-hidden p-6 sm:p-10"
            style={{ background: role.gradient, "--d": "80ms" } as React.CSSProperties}
          >
            <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-5 sm:top-5">
              <span className="label border border-white/30 bg-white/15 px-2.5 py-1.5 text-white backdrop-blur-sm">
                {role.sector}
              </span>
              <span className="label border border-white/30 bg-white/15 px-2.5 py-1.5 text-white backdrop-blur-sm">
                {role.span}
              </span>
            </div>

            <Image
              src={role.logo.src}
              alt={`${role.name} logo`}
              width={role.logo.width}
              height={role.logo.height}
            // Sized per logo, not by a shared rule — see Role.logoMax. A shared
            // cap cannot equalise a 6:1 wordmark and a near-square badge. The
            // clamp keeps the mark generous on a phone, where the panel is full
            // width, and restrained on desktop.
            style={{ maxWidth: role.logoMax }}
            className={`h-auto w-full object-contain ${
              role.logo.invert ? "brightness-0 invert" : ""
            }`}
            />
          </div>

          <p
            className="d3 rise mt-8 max-w-[30ch]"
            style={{ "--d": "160ms" } as React.CSSProperties}
          >
            {role.headline}
          </p>

          {/* Stacked, and deliberately narrower than the panel above it. Full
              block width would push the measure past 100 characters, which is
              where long-form reading falls apart. */}
          <div className="mt-5 max-w-[62ch] space-y-5">
            {role.body.map((para, i) => (
              <p
                key={i}
                className="body rise max-w-none"
                style={{ "--d": `${200 + i * 60}ms` } as React.CSSProperties}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
