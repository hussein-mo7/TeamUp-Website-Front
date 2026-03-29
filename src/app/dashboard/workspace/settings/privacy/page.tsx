import type { Metadata } from "next";
import { ProjectPrivacyForm } from "@/components/sections/dashboard";
import { MOCK_PROJECT_PRIVACY_SETTINGS } from "@/mock/Dashboard";

export const metadata: Metadata = {
  title: "TeamUp — Project Settings · Privacy",
};

const ProjectSettingsPrivacyPage = () => {
  return (
    <ProjectPrivacyForm
      initialMembershipApplications={MOCK_PROJECT_PRIVACY_SETTINGS.membershipApplications}
      initialMarketplaceVisibility={MOCK_PROJECT_PRIVACY_SETTINGS.marketplaceVisibility}
    />
  );
};

export default ProjectSettingsPrivacyPage;
