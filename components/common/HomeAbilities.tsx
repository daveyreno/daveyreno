import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import SectionTitle from "./SectionTitle";

export default function HomeAbilities() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <SectionTitle title="Abilities" />
      <div className="border rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x">
          <Link
            href="/abilities"
            className="p-4 sm:p-6 relative space-y-3 sm:space-y-4 hover:bg-accent/50 transition-colors block"
          >
            <p className="text-xl sm:text-2xl font-bold tracking-tighter">
              Strategy
            </p>
            <p className="text-sm sm:text-base text-muted-foreground pr-12">
              I define winning product bets by balancing customer needs,
              commercial impact, and long term vision.
            </p>
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>
          </Link>
          <Link
            href="/abilities"
            className="p-4 sm:p-6 relative space-y-3 sm:space-y-4 hover:bg-accent/50 transition-colors block"
          >
            <p className="text-xl sm:text-2xl font-bold tracking-tighter">
              Delivery
            </p>
            <p className="text-sm sm:text-base text-muted-foreground pr-12">
              I move ideas from concept to customers fast, often without
              sacrificing quality, alignment, or impact.
            </p>
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>
          </Link>
          <Link
            href="/abilities"
            className="p-4 sm:p-6 relative space-y-3 sm:space-y-4 hover:bg-accent/50 transition-colors block"
          >
            <p className="text-xl sm:text-2xl font-bold tracking-tighter">
              Leadership
            </p>
            <p className="text-sm sm:text-base text-muted-foreground pr-12">
              I create focus, momentum, and accountability across teams, so
              great products actually get built.
            </p>
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
