"use client";

import Link from "next/link";
import { SIGNATURES } from "@/lib/field";
import { ROLES } from "@/lib/roles";
import { useCareerField } from "@/components/visual/CareerField";

/**
 * The career as a colour index. Each column owns one role and one signature;
 * touching a column bleeds that signature into the field behind the page, so
 * the atmosphere and the résumé are the same object.
 */
export default function Spectrum() {
  const { focus, focused } = useCareerField();

  return (
    <ul
      className="grid grid-cols-2 gap-px border-t border-[var(--rule)] sm:grid-cols-4 lg:grid-cols-7"
      onMouseLeave={() => focus(null)}
    >
      {ROLES.map((role, i) => {
        const sig = SIGNATURES[role.id];
        const dim = focused !== null && focused !== role.id;
        return (
          <li key={role.id}>
            <Link
              href={`/experience#${role.id}`}
              onMouseEnter={() => focus(role.id)}
              onFocus={() => focus(role.id)}
              onBlur={() => focus(null)}
              data-dim={dim ? "true" : "false"}
              className="group relative flex h-full flex-col justify-between gap-8 border-b border-[var(--rule)] py-6 pr-4 transition-opacity duration-500 data-[dim=true]:opacity-40 sm:gap-12 sm:py-8"
              style={{ "--d": `${i * 55}ms` } as React.CSSProperties}
            >
              {/* The signature itself: a bar that fills on approach. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-[0.14] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                style={{ background: sig.css, boxShadow: `0 0 12px ${sig.css}` }}
              />
              <span className="label block">{role.span}</span>
              <span className="block">
                <span className="d3 block transition-colors duration-500 group-hover:text-[var(--ink)]">
                  {role.name}
                </span>
                <span className="label mt-2 block">{role.title}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
