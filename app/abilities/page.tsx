import React from "react";
import Disciplines from "./components/Disciplines";
import Playbook from "./components/Playbook";
import PageTitle from "@/components/typography/PageTitle";
import Tools from "./components/Tools";

export default function AbilitiesPage() {
  return (
    <div className="space-y-6">
      <PageTitle text="Abilities" />
      <Disciplines />
      <Tools />
      <Playbook />
    </div>
  );
}
