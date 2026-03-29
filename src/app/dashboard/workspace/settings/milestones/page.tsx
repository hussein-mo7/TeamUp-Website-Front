import type { Metadata } from "next";
import { ProjectMilestonesForm } from "@/components/sections/dashboard";
import { MOCK_MILESTONES } from "@/mock/Dashboard";

export const metadata: Metadata = {
  title: "TeamUp — Project Settings · Milestones",
};

const ProjectSettingsMilestonesPage = () => {
  return <ProjectMilestonesForm initialMilestones={[...MOCK_MILESTONES]} />;
};

export default ProjectSettingsMilestonesPage;
