import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const experiences = [
  {
    company: "Lendi",
    date: "2021 - Present",
    linkpath: "/experience",
    image: "/lendi-logo.svg",
    style: "bg-gradient-to-br to-sky-950 from-emerald-600",
  },
  {
    company: "Cranetime",
    date: "2017 - 2021",
    linkpath: "/experience",
    image: "/cranetime-logo.svg",
    style: "bg-gradient-to-br from-blue-600 to-blue-900",
  },
  {
    company: "LEGALNET",
    date: "2013 - 2017",
    linkpath: "/experience",
    image: "/legalnet-logo.svg",
    style: "bg-gradient-to-br from-purple-600 to-purple-900",
  },
  {
    company: "Crazy Domains",
    date: "2009 - 2016",
    linkpath: "/experience",
    image: "/crazydomains-logo.svg",
    style: "bg-gradient-to-br from-green-600 to-green-900",
  },
];

export default function ExperienceTiles() {
  return (
    <div className="grid grid-cols-6 gap-4">
      {experiences.map((experience, index) => (
        <Link
          href={experience.linkpath}
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
