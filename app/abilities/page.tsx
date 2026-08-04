import type { Metadata } from "next";
import Footer from "@/components/common/Footer";
import Reveal from "@/components/site/Reveal";
import { DISCIPLINES, PLAYBOOK } from "@/lib/abilities";

export const metadata: Metadata = {
  title: "Abilities",
  description:
    "Product, design and engineering, and the ten rules I actually run on.",
  alternates: { canonical: "/abilities" },
};

/**
 * Same spine as /experience: a narrow left rail naming the thing, a right
 * column carrying the argument at a readable measure. The three-column grid
 * this replaced squeezed the body copy to about thirty characters a line,
 * which is unreadable at any size.
 */
const RAIL = "grid gap-6 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-14";

export default function AbilitiesPage() {
  return (
    <>
      <section className="shell pb-[clamp(3rem,8vh,5rem)] pt-[clamp(4rem,14vh,9rem)]">
        <Reveal>
          <p className="label rise">Abilities</p>
          <h1
            className="d1 rise mt-6 max-w-[13ch]"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            I do all three. Unequally.
          </h1>
          <p
            className="lede rise mt-8 max-w-[58ch]"
            style={{ "--d": "170ms" } as React.CSSProperties}
          >
            Product is where I am strongest and it is not close. Design and
            engineering I have done for real: design systems from the tokens
            up, a product built and shipped end to end. Enough to do the work,
            and enough to know when someone better than me should.
          </p>
        </Reveal>
      </section>

      {/* --------------------------------------------------------- disciplines */}
      <section className="plate">
        <div className="shell">
          {DISCIPLINES.map((d) => (
            <Reveal
              key={d.name}
              as="section"
              className={`${RAIL} border-t border-[var(--rule)] py-[clamp(2.5rem,6vh,4rem)]`}
            >
              <div className="lg:sticky lg:top-28 lg:self-start">
                {/* Sized to the rail, not to `.d2`: at display size "Engineering"
                    is wider than 17rem and ran into the body column. */}
                <h2 className="rise text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.04em]">
                  {d.name}
                </h2>
                <p
                  className="label rise mt-3"
                  style={{ "--d": "60ms" } as React.CSSProperties}
                >
                  {d.level}
                </p>
              </div>

              <div className="max-w-[62ch] space-y-5">
                {d.body.map((p, j) => (
                  <p
                    key={j}
                    className="body rise max-w-none"
                    style={{ "--d": `${120 + j * 70}ms` } as React.CSSProperties}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ playbook */}
      <section className="plate">
        <div className="shell pt-[var(--stack)]">
          <Reveal className="mb-12">
            <p className="label rise">The playbook</p>
            <h2
              className="d2 rise mt-4 max-w-[16ch]"
              style={{ "--d": "80ms" } as React.CSSProperties}
            >
              Ten rules I actually run on.
            </h2>
          </Reveal>

          <Reveal>
            <ul className="border-t border-[var(--rule)]">
              {PLAYBOOK.map((p, i) => (
                <li
                  key={p.title}
                  className={`rise border-b border-[var(--rule)] py-8 ${RAIL} lg:items-baseline`}
                  style={{ "--d": `${i * 45}ms` } as React.CSSProperties}
                >
                  <h3 className="d3">{p.title}</h3>
                  <p className="body max-w-[62ch]">{p.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Footer className="mt-[var(--stack)] mb-10" />
        </div>
      </section>
    </>
  );
}
