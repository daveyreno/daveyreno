import Link from "next/link";
import { ThemeChanger } from "./Theme-Changer";
import MobileMenu from "./MobileMenu";
import Contact from "./ContactDialog";

export default function Navigation() {
  return (
    <>
      <div className="hidden md:flex gap-8 font-medium items-center">
        <ThemeChanger />
        <Link href="/abilities">Abilities</Link>
        <Link href="/experience">Experience</Link>
        <Contact />
      </div>
      <div className="flex md:hidden">
        <MobileMenu />
      </div>
    </>
  );
}
