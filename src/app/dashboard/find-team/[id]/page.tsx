import type { Metadata } from "next";
import { FIND_TEAM_PROJECTS } from "@/mock/FindTeam";
import ProjectDetailPage from "@/components/sections/dashboard/findTeam/ProjectDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return FIND_TEAM_PROJECTS.map((p) => ({ id: String(p.id) }));
}

export const metadata: Metadata = {
  title: "TeamUp — Project Details",
};

const ProjectDetailRoute = async ({ params }: Props) => {
  const { id } = await params;
  return <ProjectDetailPage id={id} />;
};

export default ProjectDetailRoute;
