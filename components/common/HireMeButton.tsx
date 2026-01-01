"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ContactDialog } from "./ContactDialog";

interface HireMeButtonProps {
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function HireMeButton({
  variant = "default",
  size,
  className,
}: HireMeButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        Hire Me
      </Button>
      <ContactDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

