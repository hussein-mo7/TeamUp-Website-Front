"use client";

import { FileText, Users, Calendar, Shield, Upload } from "lucide-react";
import {
  DashboardSidebarNav,
  DeleteProjectButton,
} from "@/components/ui/navigation";
import { PROJECT_SETTINGS_NAV_LINKS } from "@/mock/Dashboard";

const navIcon = {
  general: FileText,
  team: Users,
  milestones: Calendar,
  privacy: Shield,
  submission: Upload,
} as const;

const items = PROJECT_SETTINGS_NAV_LINKS.map((link) => ({
  id: link.id,
  href: link.href,
  label: link.label,
  icon: navIcon[link.id],
}));

const ProjectSettingsSidebar = () => {
  return (
    <DashboardSidebarNav
      aria-label="Project settings sections"
      items={items}
      className="md:min-h-[28rem]"
      footer={<DeleteProjectButton />}
    />
  );
};

export default ProjectSettingsSidebar;
