import PageTitle from "@/components/typography/PageTitle";
import SubTitle from "@/components/typography/SubTitle";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { experiences } from "@/data/experiences";

export default function ExperiencePage() {
  return (
    <div className="space-y-6">
      <PageTitle text="Experience" />
      <SubTitle text="Greatest Hits" />

      {experiences.map((experience, index) => (
        <div className="border rounded-xl p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
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
              className="rounded-md object-cover w-full h-auto max-w-40 lg:max-w-56 xl:max-w-64"
            />
          </AspectRatio>
          <div className="w-full space-y-8 p-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                {experience.company}
              </h2>

              <div className="text-slate-400 flex flex-col lg:flex-row gap-2">
                <p>{experience.role}</p>
                <p className="text-slate-500 hidden lg:block">&#x2022;</p>
                <p className="text-slate-00">{experience.date}</p>
              </div>

              <div className="flex gap-2 flex-wrap">
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
