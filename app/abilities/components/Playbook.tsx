import SubTitle from "@/components/typography/SubTitle";
import React from "react";
import {
  Package,
  SwatchBook,
  DatabaseZap,
  Trophy,
  UserCheck,
  Users,
  Gauge,
} from "lucide-react";

const iconMapping = {
  Package: Package,
  SwatchBook: SwatchBook,
  DatabaseZap: DatabaseZap,
  Trophy: Trophy,
  UserCheck: UserCheck,
  Users: Users,
  Gauge: Gauge,
};

const abilities = [
  {
    icon: "Package",
    title: "Delivery",
    copy: "Waterfall releases suck, avoid them when possible. Discovery and ideation should be part of small, rapid delivery cycles. Initiatives chopped into achievable, monitorable phases, ensuring that each step offers an opportunity to pivot to achieve maximum value.",
  },
  {
    icon: "SwatchBook",
    title: "Keep it simple, stupid",
    copy: "Embrace simplicity, it's not hard. Complex systems benefit from straightforward, intuitive implementations, ensuring products are user-friendly and efficient. Allowing sophisticated processes to become super simple to use.",
  },
  {
    icon: "Trophy",
    title: "Objectives & Metrics",
    copy: "Define success clearly. Setting specific objectives and tracking metrics ensures projects are guided by measurable goals. This focus enables real-time adjustments, optimising performance and aligning every effort with the companies overarching targets for maximum impact.",
  },
  {
    icon: "DatabaseZap",
    title: "Deep Analysis",
    copy: "Dive deep, think ahead. Thorough analysis underpins every product, monitoring data into actionable insights. By examining the intricacies of each challenge, strategies are informed and decisions made with precision, paving the way for innovative solutions that address core needs and exceed expectations.",
  },
  {
    icon: "Users",
    title: "Stakeholder Journeys",
    copy: "Involve and evolve. Bringing stakeholders into the heart of the product development process ensures their voices are heard and valued. By actively engaging them, we foster a collaborative environment where feedback is not just solicited but acted upon.",
  },
  {
    icon: "Gauge",
    title: "Strive For Better",
    copy: "Never settle. Continuous improvement is the key to staying ahead. By always striving for better, we push the boundaries of what's possible, ensuring our products not only meet current needs but are also poised for future challenges and opportunities.",
  },
];

export default function Playbook() {
  return (
    <>
      <SubTitle text="Playbook" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {abilities.map((ability, index) => (
          <div className="p-6 space-y-4 border rounded-xl">
            {React.createElement(
              iconMapping[ability.icon as keyof typeof iconMapping]
            )}
            <p className="text-2xl font-bold tracking-tight">{ability.title}</p>
            <p>{ability.copy}</p>
          </div>
        ))}
      </div>
    </>
  );
}
