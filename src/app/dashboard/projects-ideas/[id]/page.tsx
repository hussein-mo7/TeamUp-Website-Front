import type { Metadata } from "next";
import { PROJECTS_IDEAS } from "@/mock/ProjectsIdeas";
import ProjectIdeasDetailPage from "@/components/sections/dashboard/projectsIdeas/ProjectIdeasDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECTS_IDEAS.map((p) => ({ id: String(p.id) }));
}

export const metadata: Metadata = {
  title: "TeamUp — Project Idea Details",
};

const ProjectIdeasDetailRoute = async ({ params }: Props) => {
  const { id } = await params;
  return <ProjectIdeasDetailPage id={id} />;
};

export default ProjectIdeasDetailRoute;
