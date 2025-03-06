import Section from "@/views/goal/component/Section";

import GoalTitle from "./GoalTitle";
import Progress from "./Progress";

export default function GoalHeader() {
  return (
    <Section className="relative bg-white hover:shadow">
      <GoalTitle />
      <Progress />
    </Section>
  );
}
