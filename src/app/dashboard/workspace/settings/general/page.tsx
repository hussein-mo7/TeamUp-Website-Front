import type { Metadata } from "next";
import { ProjectGeneralInfoForm } from "@/components/sections/dashboard";
import { MOCK_PROJECT_SETTINGS } from "@/mock/Dashboard";
import { WORKSPACE_PROJECT_DESCRIPTION } from "@/mock/TeamWorkspace";

export const metadata: Metadata = {
  title: "TeamUp — Project Settings · General",
};

const ProjectSettingsGeneralPage = () => {
  return (
    <ProjectGeneralInfoForm
      initialTitle={MOCK_PROJECT_SETTINGS.title}
      initialDescription={WORKSPACE_PROJECT_DESCRIPTION}
      initialSupervisor={MOCK_PROJECT_SETTINGS.supervisor}
      initialUniversity={MOCK_PROJECT_SETTINGS.university}
      initialMajor={MOCK_PROJECT_SETTINGS.major}
      bannerSrc={MOCK_PROJECT_SETTINGS.bannerImage}
    />
  );
};

export default ProjectSettingsGeneralPage;
