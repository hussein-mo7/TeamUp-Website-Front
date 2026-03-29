import type { Metadata } from "next";
import { ProjectSubmissionForm } from "@/components/sections/dashboard";

export const metadata: Metadata = {
  title: "TeamUp — Project Settings · Project Submission",
};

const ProjectSettingsSubmissionPage = () => {
  return <ProjectSubmissionForm />;
};

export default ProjectSettingsSubmissionPage;
