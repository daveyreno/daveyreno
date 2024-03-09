"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Logo() {
  const { theme, systemTheme, resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState("/daveyreno-logo-l.svg"); // Default to light logo

  useEffect(() => {
    // Use 'resolvedTheme' to account for 'system' theme preference
    const currentTheme = theme === "system" ? systemTheme : theme;
    const logoPath =
      currentTheme === "dark"
        ? "/daveyreno-logo-l.svg"
        : "/daveyreno-logo-d.svg";
    setLogoSrc(logoPath);
  }, [theme, systemTheme]);

  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex items-center justify-center h-12 w-12 rounded-full">
        <div className="h-8 w-8">
          <Image
            src={logoSrc}
            width={"192"}
            height={"218"}
            alt="DaveyReno Logo"
            priority
          />
        </div>
      </div>
    </Link>
  );
}
