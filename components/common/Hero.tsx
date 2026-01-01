"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { LayoutTextFlip } from "../ui/layout-text-flip";
import { HireMeButton } from "./HireMeButton";

export default function Hero() {
  return (
    <section className="flex items-center justify-center bg-background px-4 py-16 sm:py-24 md:py-32 lg:py-40">
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span>I am a</span>
          <LayoutTextFlip
            text=""
            words={[
              "Product Manager",
              "People Leader",
              "Mentor",
              "Value Creator",
            ]}
            duration={3000}
            wordClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight"
          />
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
          I build thoughtful products, move fast with purpose, and deliver
          results that users <span className="whitespace-nowrap">love ❤️</span>
        </p>
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap px-2">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/abilities">Learn More</Link>
          </Button>
          <HireMeButton className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
