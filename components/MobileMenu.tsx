import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";

export default function MobileMenu() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant={"outline"}>
          <Menu className="w-5 h-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4">
          <Link
            href="/"
            className="border px-5 py-4 rounded-t-xl flex justify-between items-center"
          >
            <p>Home</p>
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            href="/abilities"
            className="border px-5 py-4 flex justify-between items-center"
          >
            <p>Ability</p>
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            href="experience"
            className="border px-5 py-4 rounded-b-xl flex justify-between items-center"
          >
            Experience
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
