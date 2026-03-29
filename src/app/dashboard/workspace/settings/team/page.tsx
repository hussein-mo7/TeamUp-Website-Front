import type { Metadata } from "next";
import { ProjectTeamManagementForm } from "@/components/sections/dashboard";
import { MOCK_TEAM_PROJECT_SETTINGS } from "@/mock/Dashboard";
import { MOCK_WORKSPACE_MEMBERS } from "@/mock/TeamWorkspace";

export const metadata: Metadata = {
  title: "TeamUp — Project Settings · Team Management",
};

const ProjectSettingsTeamPage = () => {
  return (
    <ProjectTeamManagementForm
      initialCapacity={MOCK_TEAM_PROJECT_SETTINGS.capacity}
      initialRequiredSkills={[...MOCK_TEAM_PROJECT_SETTINGS.requiredSkills]}
      initialMembers={MOCK_WORKSPACE_MEMBERS}
    />
  );
};

export default ProjectSettingsTeamPage;
