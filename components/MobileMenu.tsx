import React from "react";
import { Button } from "./ui/button";
import { Menu, Moon } from "lucide-react";

export default function MobileMenu() {
  return (
    <Button variant={"outline"}>
      <Menu className="w-5 h-5" />
    </Button>
  );
}
