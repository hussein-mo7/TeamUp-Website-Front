import type { Metadata } from "next";
import { AdminDashboardLayout } from "@/components/layout";

export const metadata: Metadata = {
  title: "TeamUp — Admin Dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
