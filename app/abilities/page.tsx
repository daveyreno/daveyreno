import React from "react";
import Disciplines from "./components/Disciplines";
import Playbook from "./components/Playbook";
import PageTitle from "@/components/typography/PageTitle";
import Tools from "./components/Tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DaveyReno Abilities",
  description:
    "Discover DaveyReno's unique abilities that set him apart as a Product Manager. From ideation to execution, see how his skills empower teams and drive innovation.",
};

export default function AbilitiesPage() {
  return (
    <div className="space-y-6">
      <PageTitle text="Abilities" />
      <Disciplines />
      {/* <Tools /> */}
      <Playbook />
    </div>
  );
}
