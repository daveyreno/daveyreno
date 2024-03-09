import PageTitle from "@/components/typography/PageTitle";
import SubTitle from "@/components/typography/SubTitle";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

const experiences = [
  {
    company: "Lendi",
    role: "Senior Product Manager",
    date: "2021 - Present",
    linkpath: "/lendi",
    image: "/lendi-logo.svg",
    style: "bg-gradient-to-br to-sky-950 from-emerald-600",
    copy: [
      "One of Australia’s fastest growing fintechs, building market leading technology to transform the home loan industry through our powerhouse property brands and networks - Aussie and Lendi.",
      "Lendi Group exists to transform the stressful, disjointed and sometimes overwhelming journey of financing a property into a friction-free experience for everyone involved.",
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
    style: "bg-gradient-to-br from-green-600 to-green-900",
    copy: [
      "Joined a team of 5 young and ambitious geeks wanting to learn how to scale a tech business. Crazy grew quickly to become Australias largest domain name and hosting provider and was sold to web.com.",
      "Created a susibuary building hundreds of customers websites (10k-150k) to train junior developers to progress into the parent company as engineering talent was hard to come by in Perth those days!",
    ],
    badges: ["Web Services", "Growth", "Startup"],
  },
];
export default function ExperiencePage() {
  return (
    <div className="space-y-6">
      <PageTitle text="Experience" />
      <SubTitle text="Greatest Hits" />

      {experiences.map((experience, index) => (
        <div className="border rounded-xl p-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AspectRatio
            ratio={16 / 9}
            className={`rounded-lg p-4 flex justify-center items-center text-xs w-full  ${
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
          <div className="w-full space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                {experience.company}
              </h2>

              <div className="text-slate-400 flex gap-2">
                <p>{experience.role}</p>
                <p className="text-slate-500">&#x2022;</p>
                <p className="text-slate-00">{experience.date}</p>
              </div>

              <div className="space-x-2">
                {experience.badges.map((badge, index) => (
                  <Badge variant={"outline"}>{badge}</Badge>
                ))}
              </div>
            </div>
            {experience.copy.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
