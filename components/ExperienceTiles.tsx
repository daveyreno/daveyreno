import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { experiences } from "@/data/experiences";

export default function ExperienceTiles() {
  return (
    <div className="grid grid-cols-6 gap-4">
      {experiences.map((experience, index) => (
        <Link
          href="/experience"
          key={index}
          className="col-span-6 md:col-span-3 gap-3 flex-col p-3 group justify-between flex rounded-2xl border"
        >
          <div className="flex p-3 justify-between">
            <div className="space-y-1">
              <p className="text-xl tracking-tight text-start font-bold">
                {experience.company}
              </p>
              <p className="text-xs text-slate-400 text-start uppercase">
                {experience.date}
              </p>
            </div>
            <div className="">
              <div className="rounded-full p-2 border group-hover:scale-125 group-hover:bg-primary-foreground transition-all duration-300">
                <Eye />
              </div>
            </div>
          </div>
          <AspectRatio
            ratio={16 / 9}
            className={`rounded-lg p-4 flex justify-center items-center text-xs ${
              experience.style || ""
            }`}
          >
            <Image
              src={experience.image}
              width={"300"}
              height={"200"}
              alt={`${experience.company} Logo`}
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </Link>
      ))}
    </div>
  );
}
