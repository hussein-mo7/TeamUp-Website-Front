"use client";

import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/buttons";
import { variantClasses, sizeClasses } from "@/components/ui/buttons/buttonStyles";
import { PROJECT_SETTINGS_NAV_LINKS } from "@/mock/Dashboard";

interface WorkspaceHeaderProps {
  /** Mentor / team admin — show Project Setting */
  isLead: boolean;
  onLeaveRequest: () => void;
}

const WorkspaceHeader = ({ isLead, onLeaveRequest }: WorkspaceHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
      <Heading level="h3" className="font-semibold text-content">
        Team Work Space
      </Heading>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="!border-none !text-error !bg-transparent hover:!bg-error/10 hover:!text-error"
          onClick={onLeaveRequest}
        >
          <LogOut className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
          Leave Project
        </Button>
        {isLead ? (
          <Link
            href={PROJECT_SETTINGS_NAV_LINKS[0].href}
            className={`inline-flex items-center justify-center rounded-lg font-primary font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 ${variantClasses.primary} ${sizeClasses.md}`}
          >
            <Settings className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
            Project Setting
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default WorkspaceHeader;
