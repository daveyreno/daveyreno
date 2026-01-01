"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { HireMeButton } from "./HireMeButton";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div>
        <div className="bg-gradient-to-r to-pink-600 from-blue-600 h-2"></div>
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 lg:py-8 px-4 text-lg">
          <Logo />
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/abilities" className="">
              Abilities
            </Link>
            <Link href="/experience" className="">
              Experience
            </Link>
            <HireMeButton />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
