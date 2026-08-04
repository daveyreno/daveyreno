"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Contact from "@/components/site/Contact";

const NAV = [
  { label: "Experience", href: "/experience" },
  { label: "Abilities", href: "/abilities" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    // Translucent rather than transparent: content scrolls underneath a sticky
    // header, and with no backdrop the role panels read straight through it.
    // The field sits below the whole content layer, so it still shows through.
    <header className="sticky top-0 z-30 bg-[#060608]/72 backdrop-blur-xl">
      <div className="shell">
        {/* items-center, not items-start: the identity block is two lines tall,
            so top-aligning the nav left it sitting visibly high. */}
        <div className="flex items-center justify-between gap-6 py-5 sm:py-7">
          {/* Identity reads as two lines of mono, the way the index of a
              printed work does — not as a logo lockup. */}
          <Link href="/" className="group -m-1 p-1" aria-label="Davey Reno, home">
            <span className="label label--bright block transition-colors group-hover:text-[var(--ink)]">
              Davey Reno
            </span>
            <span className="label mt-1 block">Product Manager</span>
          </Link>

          {/* Contact sits inside the same list as the links so it shares their
              row and baseline exactly — as a sibling it drifted out of line. */}
          <nav aria-label="Sections">
            <ul className="flex flex-col gap-1 sm:flex-row sm:gap-8">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} className="flex">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="label transition-colors hover:text-[var(--ink)] aria-[current=page]:text-[var(--ink)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="flex">
                <Contact className="label transition-colors hover:text-[var(--ink)]">
                  Contact
                </Contact>
              </li>
            </ul>
          </nav>
        </div>
        <div className="h-px w-full bg-[var(--rule)]" />
      </div>
    </header>
  );
}
