"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Settings,
  Users,
  UsersRound,
  X,
} from "lucide-react";
import { LogoutModal } from "@/components/ui/modals";
import { useLogout } from "@/hooks/useAuth";
import { ADMIN_NAV_ITEMS } from "@/mock/AdminDashboard";

export interface AdminSidebarProps {
  activeHref: string;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  isDesktop?: boolean;
}

const iconMap = {
  dashboard: LayoutDashboard,
  users: Users,
  ideas: Lightbulb,
  teams: UsersRound,
  reports: AlertTriangle,
  settings: Settings,
  logout: LogOut,
} as const;

export const AdminSidebar = ({
  activeHref,
  isMobileOpen,
  onCloseMobile,
  isDesktop = false,
}: AdminSidebarProps) => {
  const router = useRouter();
  const { logout } = useLogout();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setLogoutModalOpen(false);
      onCloseMobile();
      router.replace("/auth?mode=signin");
    }
  };

  const renderNavItem = (item: (typeof ADMIN_NAV_ITEMS)[number]) => {
    const Icon = iconMap[item.icon];
    const isActive = item.href === activeHref;
    const showDivider = item.icon === "settings";

    if (item.icon === "logout") {
      return (
        <div key={item.href}>
          {showDivider && (
            <div className={`h-px bg-white/15 ${isDesktop ? "my-2" : "my-1"}`} />
          )}
          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors duration-200 text-white/85 hover:bg-white/10 hover:text-white"
          >
            <Icon size={18} aria-hidden="true" className="shrink-0" />
            <span className="font-medium">{item.label}</span>
          </button>
        </div>
      );
    }

    return (
      <div key={item.href}>
        {showDivider && (
          <div className={`h-px bg-white/15 ${isDesktop ? "my-2" : "my-1"}`} />
        )}
        <Link
          href={item.href}
          className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors duration-200 ${
            isActive
              ? "bg-white text-primary shadow-[0_4px_14px_rgba(15,23,42,0.12)]"
              : "text-white/85 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Icon size={18} aria-hidden="true" className="shrink-0" />
          <span className="font-medium">{item.label}</span>
        </Link>
      </div>
    );
  };

  const sidebarContent = (
    <>
      <Link
        href="/admin"
        className={`flex items-center justify-center px-3 py-4 ${isDesktop ? "" : "pb-4"}`}
      >
        <div className="relative h-7 w-28">
          <Image
            src="/images/Teamup.svg"
            alt="TeamUp"
            fill
            unoptimized
            className="object-contain"
          />
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-1.5 border-t border-white/15 pt-4">
        {ADMIN_NAV_ITEMS.map(renderNavItem)}
      </nav>
    </>
  );

  if (isDesktop) {
    return (
      <>
        <aside className="sticky top-0 hidden h-dvh w-[248px] shrink-0 flex-col overflow-y-auto bg-[#2563EB] px-4 py-5 text-white shadow-[0_14px_40px_rgba(37,99,235,0.24)] lg:flex">
          {sidebarContent}
        </aside>

        <LogoutModal
          isOpen={logoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={handleLogout}
        />
      </>
    );
  }

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
          onClick={onCloseMobile}
          role="presentation"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[#2563EB] px-4 py-5 text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)] transition-transform duration-300 lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-4">
          <Link href="/admin" className="relative h-7 w-28">
            <Image
              src="/images/Teamup.svg"
              alt="TeamUp"
              fill
              unoptimized
              className="object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={onCloseMobile}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            aria-label="Close navigation"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-2 flex flex-col gap-1.5 border-t border-white/15 pt-4">
          {ADMIN_NAV_ITEMS.map(renderNavItem)}
        </nav>
      </aside>

      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};
