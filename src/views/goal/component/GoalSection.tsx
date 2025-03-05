import Section from "@/views/goal/component/Section";

import GoalHeader from "./GoalHeader";
import ProgressContainer from "./ProgressContainer";

export default function GoalSection() {
  return (
    <Section className="relative bg-white hover:shadow">
      <GoalHeader />
      <ProgressContainer />
    </Section>
  );
}
