import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const experiences = [
  {
    company: "Lendi",
    role: "Senior Product Manager",
    date: "2021 - Present",
    linkpath: "/lendi",
    image: "/lendi-logo.svg",
    style: "bg-gradient-to-br to-sky-950 from-emerald-600",
    copy: [
      "Onboarded as Lendi merged with Aussie to become the largest home loan originator behind the big banks. A sophisticated event driven microservice system powers Lendi, while Aussie had older infrastructure to be retired.",
      "Successfully delivered an interplatform sync to allow seemless integration, delivered bespoke notification system, provided self-service customer features to improve support efficiency, a referrals system for brokers and customers.",
    ],
    badges: [
      "Fintech",
      "Enterprise",
      "Home Loans",
      "Event Driven",
      "Product Led",
    ],
  },
  {
    company: "Cranetime",
    role: "Product Manager",
    date: "2017 - 2021",
    linkpath: "/cranetime",
    image: "/cranetime-logo.svg",
    style: "bg-gradient-to-br from-blue-600 to-blue-900",
    copy: [
      "Singlehandidly developed design system, delivered MVP and went on to coach teams to continually deliver value for major construction sites globally.",
      "Cranetime was the first of its kind construction site crane and delivery scheduling system (many copycats today), and used on over 20bn projects, aquired in 2021.",
    ],
    badges: ["Contech", "Logistics", "Startup", "Monolythic"],
  },
  {
    company: "LEGALNET",
    role: "Product Manager",
    date: "2013 - 2017",
    linkpath: "/legalnet",
    image: "/legalnet-logo.svg",
    style: "bg-gradient-to-br from-purple-600 to-purple-900",
    copy: [
      "Formed the company with two great lawyers in Western Australia. Developed the customer journey, website and bespoke crm system with the help of one engineer.",
      "Company went on to scale enabling legal case volumes and dwarfed the existing firms revenue, successfully exited in 2017 and is still in operation today.",
    ],
    badges: ["Law", "Lead Generation", "CRM", "Startup"],
  },
  {
    company: "Crazy Domains",
    role: "Project Manager",
    date: "2009 - 2016",
    linkpath: "/crazydomains",
    image: "/crazydomains-logo.svg",
    style: "bg-gradient-to-br from-red-600 to-yellow-500",
    copy: [
      "Joined a team of 5 young and ambitious geeks wanting to learn how to scale a tech business. Crazy grew quickly to become Australias largest domain name and hosting provider and was sold to web.com.",
      "Created a susbsiduary building hundreds of customers websites (10k-100k) to train junior developers to progress into the parent company as engineering talent was hard to come by in Perth those days!",
    ],
    badges: ["Web Services", "Growth", "Startup"],
  },
];

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
            className={`rounded-lg p-4 flex justify-center items-center text-xs ${experience.style}`}
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
