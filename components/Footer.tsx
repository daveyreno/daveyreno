import { Button } from "@/components/ui/button";
import { Dribbble, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-center flex flex-col items-center">
      <div className="max-w-6xl w-full py-10 space-y-8">
        <div className="flex justify-center gap-3">
          <Link
            href="https://www.linkedin.com/in/dave-r/"
            className="rounded-full p-2 border hover:scale-125 hover:bg-primary-foreground transition-all duration-300"
          >
            <Linkedin />
          </Link>
          <Link
            href="https://github.com/daveyreno/"
            className="rounded-full p-2 border hover:scale-125 hover:bg-primary-foreground transition-all duration-300"
          >
            <Github />
          </Link>
          <Link
            href="https://dribbble.com/daveyreno"
            className="rounded-full p-2 border hover:scale-125 hover:bg-primary-foreground transition-all duration-300"
          >
            <Dribbble />
          </Link>
        </div>
        <div className=" text-xs text-slate-400">© {currentYear}</div>
      </div>
    </div>
  );
}
