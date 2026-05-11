"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/ui/navigation";
import { AdminDashboardHeader } from "./AdminDashboardHeader";
import { ADMIN_NAV_ITEMS } from "@/mock/AdminDashboard";
import AuthGuard from "./AuthGuard";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export const AdminDashboardLayout = ({
  children,
}: AdminDashboardLayoutProps) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Calculate active route
  const activeHref = useMemo(() => {
    if (pathname === "/admin") return "/admin";
    const matched = ADMIN_NAV_ITEMS.filter(({ href }) => href !== "/auth")
      .sort((a, b) => b.href.length - a.href.length)
      .find((item) => pathname.startsWith(item.href));
    return matched?.href ?? "/admin";
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-white text-content">
      <AuthGuard requiredRoles={["SYSTEM_ADMIN"]} fallbackRedirect="/dashboard" loadingLabel="Checking admin access...">
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <AdminSidebar
            activeHref={activeHref}
            isMobileOpen={false}
            onCloseMobile={() => {}}
            isDesktop
          />

          {/* Mobile Sidebar */}
          <AdminSidebar
            activeHref={activeHref}
            isMobileOpen={mobileOpen}
            onCloseMobile={() => setMobileOpen(false)}
            isDesktop={false}
          />

          {/* Main Content */}
          <div className="flex min-w-0 flex-1 flex-col">
            <AdminDashboardHeader onMobileMenuClick={() => setMobileOpen(true)} />

            <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
              {children}
            </main>
          </div>
        </div>
      </AuthGuard>
    </div>
  );
};
