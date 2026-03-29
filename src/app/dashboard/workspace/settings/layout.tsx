import { Breadcrumb } from "@/components/ui/navigation";
import { Heading } from "@/components/ui/typography";
import { ProjectSettingsShell } from "@/components/sections/dashboard";
import { TEAM_WORKSPACE_HREF } from "@/mock";

const ProjectSettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Main Student Dashboard", href: "/dashboard" },
          { label: "Team Work Space", href: TEAM_WORKSPACE_HREF },
          { label: "Project Settings" },
        ]}
      />
      <Heading level="h2" className="mb-4 font-semibold text-content sm:mb-5">
        Team Work Space
      </Heading>
      <ProjectSettingsShell>{children}</ProjectSettingsShell>
    </div>
  );
};

export default ProjectSettingsLayout;
