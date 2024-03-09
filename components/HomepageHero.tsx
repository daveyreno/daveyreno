import { Button } from "@/components/ui/button";
import Contact from "./ContactDialog";
import Link from "next/link";

export default function HomepageHero() {
  return (
    <div className="justify-center py-24 md:py-40 flex flex-col gap-10 text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
        I am a Product Manager
      </h1>
      <p className="text-xl">
        Meticulous in the detail, a great communicator and utterly relentless
        <br />
        in constantly delivering products that customers love <br />& value that
        contributes to company goals.
      </p>
      <div className="flex gap-3 justify-center font-medium">
        <Link href="/abilities">
          <Button variant={"outline"} size={"lg"}>
            Learn More
          </Button>
        </Link>
        <Contact />
      </div>
    </div>
  );
}
