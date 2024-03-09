import SubTitle from "@/components/typography/SubTitle";
import { Progress } from "@/components/ui/progress";

const disciplines = [
  {
    title: "Product",
    progress: 95,
    competency: "Master",
    copy: [
      "With 14 years of experience in building digital products, I bring a wealth of knowledge and a proven track record practicing continuous discovery and delivery. My leadership extends beyond traditional boundaries, having led multiple cross-functional teams to success by fostering collaboration, innovation, and coaching. I am fanatical about quickly understanding customer needs, grasping business goals and metrics, aligning and delivering project objectives with strategic business outcomes.",
      "My background spans early-stage startups to large corporate entities and has equipped me with the unique ability to navigate and thrive in diverse environments, ensuring that each product I touch not only meets market demands but sets new benchmarks for excellence.",
    ],
  },
  {
    title: "Design",
    progress: 55,
    competency: "Experienced",
    copy: [
      "In the dynamic field of UI/UX Design, my proficiency with Figma stands out, enabling me to craft comprehensive UI systems that enhance user experience and engagement. I've designed entire applications that are both intuitive and visually appealing.",
      "My unique experience as the sole product manager and designer in a startup environment underscores my ability to wear multiple hats, offering a holistic approach to design that balances user needs with business goals. This blend of skills ensures that I bring a thoughtful, user-centered perspective to every project, driving innovation and creating designs that resonate with users and achieve measurable success.",
    ],
  },
  {
    title: "Engineering",
    progress: 25,
    competency: "Rookie",
    copy: [
      "My engineering journey is underscored by my familiarity with React and Next.js, which served as the foundation for building this very website. As a hobby i enjoy playing with APIs and React components, showcasing my ability to bring complex functionality to life. Leveraging my understanding of coding, I excel in designing technical implementations with seasoned engineers that are not only robust but also optimised for delivery and scalability.",
      "This holistic approach to engineering underpins my capability to contribute significantly across the full spectrum of product development, from conceptual design through to deployment and optimisation.",
    ],
  },
];

export default function Disciplines() {
  return (
    <>
      <SubTitle text="Disciplines" />
      <div className="flex flex-col md:flex-row gap-4">
        {disciplines.map((discipline, index) => (
          <div
            key={index}
            className="w-full md:w-1/3 flex flex-col border rounded-xl p-6 space-y-5"
          >
            <h2 className="text-2xl font-bold tracking-tight">
              {discipline.title}
            </h2>
            <div className="space-y-2">
              <Progress value={discipline.progress} />
              <p className="text-xs text-slate-400 text-start uppercase">
                {discipline.competency}
              </p>
            </div>
            {discipline.copy.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
