"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One orchestrated entrance for a whole block. Children opt in with `.rise`
 * and stagger themselves with `--d`; this only flips the switch once, when the
 * block first enters view. Content is visible by default if JS never runs —
 * the class only *hides* it after hydration.
 */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
  amount = 0.18,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "li";
  amount?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [amount]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      data-shown={shown ? "true" : "false"}
    >
      {children}
    </Tag>
  );
}
