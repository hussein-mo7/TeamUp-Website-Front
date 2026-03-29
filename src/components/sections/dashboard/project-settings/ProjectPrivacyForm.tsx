"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/buttons";
import { variantClasses, sizeClasses } from "@/components/ui/buttons/buttonStyles";
import { Select } from "@/components/ui/forms";
import {
  PROJECT_MARKETPLACE_VISIBILITY_OPTIONS,
  PROJECT_MEMBERSHIP_APPLICATION_OPTIONS,
  TEAM_WORKSPACE_HREF,
} from "@/mock/Dashboard";

export interface ProjectPrivacyFormProps {
  initialMembershipApplications: string;
  initialMarketplaceVisibility: string;
}

const ProjectPrivacyForm = ({
  initialMembershipApplications,
  initialMarketplaceVisibility,
}: ProjectPrivacyFormProps) => {
  const [membershipApplications, setMembershipApplications] = useState(
    initialMembershipApplications,
  );
  const [marketplaceVisibility, setMarketplaceVisibility] = useState(
    initialMarketplaceVisibility,
  );

  const handleSave = () => {
    console.log("save project privacy (mock)", {
      membershipApplications,
      marketplaceVisibility,
    });
  };

  return (
    <div className="space-y-5 p-4 sm:p-6 md:p-8">
      <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
        <Select
          id="privacy-membership-applications"
          label="Receiving applications for membership"
          options={[...PROJECT_MEMBERSHIP_APPLICATION_OPTIONS]}
          value={membershipApplications}
          onChange={(e) => setMembershipApplications(e.target.value)}
        />
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
        <Select
          id="privacy-marketplace-visibility"
          label="Appearing in the ideas marketplace"
          options={[...PROJECT_MARKETPLACE_VISIBILITY_OPTIONS]}
          value={marketplaceVisibility}
          onChange={(e) => setMarketplaceVisibility(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="button" variant="primary" size="md" onClick={handleSave}>
          Save
        </Button>
        <Link
          href={TEAM_WORKSPACE_HREF}
          className={`inline-flex items-center justify-center rounded-lg font-primary font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${variantClasses.secondary} ${sizeClasses.md}`}
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default ProjectPrivacyForm;
