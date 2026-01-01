import Link from "next/link";
import { Button } from "../ui/button";
import { HireMeButton } from "./HireMeButton";

interface ConvincedYetProps {
  secondaryButtonText: string;
  secondaryButtonHref: string;
}

export default function ConvincedYet({
  secondaryButtonText,
  secondaryButtonHref,
}: ConvincedYetProps) {
  return (
    <div className="mt-12">
      <div className="border rounded-2xl p-8 sm:p-12">
        <div className="text-center space-y-6">
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-2">
              Convinced Yet?
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              Let's build something amazing together
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <HireMeButton size="lg" />
            <Button variant="outline" asChild size="lg">
              <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

