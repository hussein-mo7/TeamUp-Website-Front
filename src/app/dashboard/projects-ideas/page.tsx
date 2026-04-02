import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/navigation";
import ProjectsIdeasSection from "@/components/sections/dashboard/projectsIdeas/ProjectsIdeasSection";

export const metadata: Metadata = {
  title: "TeamUp — Projects Ideas",
};

const ProjectsIdeasPage = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Main Student Dashboard", href: "/dashboard" },
          { label: "Projects ideas" },
        ]}
      />
      <ProjectsIdeasSection />
    </div>
  );
};

export default ProjectsIdeasPage;
