import type { Metadata } from "next";
import { UsersManagementView } from "@/components/sections/admin/users";

export const metadata: Metadata = {
  title: "TeamUp — Users Management",
};

export default function AdminUsersPage() {
  return <UsersManagementView />;
}
