import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdminUserDetailById } from "@/mock/AdminUsers";
import { UserDetailsView } from "@/components/sections/admin/users/details";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const user = getAdminUserDetailById(Number(id));

  return {
    title: user ? `TeamUp — ${user.name}` : "TeamUp — User Details",
  };
}

export default async function AdminUserDetailsPage({ params }: Props) {
  const { id } = await params;
  const user = getAdminUserDetailById(Number(id));

  if (!user) return notFound();

  return <UserDetailsView user={user} />;
}
