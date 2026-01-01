import { Github, Linkedin } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <div className="max-w-7xl mx-auto py-8 flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <Button variant="outline" size="icon" className="rounded-full" asChild>
          <a
            href="https://www.linkedin.com/in/dave-r/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </Button>
        <Button variant="outline" size="icon" className="rounded-full" asChild>
          <a
            href="https://github.com/daveyreno/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">© 2025</p>
    </div>
  );
}
