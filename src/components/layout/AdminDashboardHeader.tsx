"use client";

import Image from "next/image";
import { Bell, Menu, Search } from "lucide-react";
import { ADMIN_PROFILE } from "@/mock/AdminDashboard";

export interface AdminDashboardHeaderProps {
  onMobileMenuClick: () => void;
}

export const AdminDashboardHeader = ({
  onMobileMenuClick,
}: AdminDashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        {/* Menu button - Mobile only */}
        <button
          type="button"
          onClick={onMobileMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={18} aria-hidden="true" />
        </button>

        {/* Search bar - Desktop only */}
        <div className="relative hidden flex-1 max-w-xl items-center lg:flex">
          <Search
            size={16}
            className="absolute left-3.5 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="text"
            defaultValue=""
            placeholder="Search"
            aria-label="Search admin dashboard"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 font-primary text-sm text-content placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
          />
        </div>

        {/* Right section - Notifications & Profile */}
        <div className="ml-auto flex items-center gap-3">
          {/* Notifications button */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100"
          >
            <Bell size={18} aria-hidden="true" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error" />
          </button>

          {/* Profile section */}
          <div className="flex items-center gap-3 rounded-2xl px-3 py-1.5 transition-colors hover:bg-slate-50">
            <div className="text-right leading-tight">
              <p className="font-primary text-sm font-semibold text-content">
                {ADMIN_PROFILE.name}
              </p>
              <p className="font-primary text-[11px] text-slate-500">
                {ADMIN_PROFILE.role}
              </p>
            </div>
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
              <Image
                src={ADMIN_PROFILE.avatar}
                alt={ADMIN_PROFILE.name}
                fill
                unoptimized
                className="object-cover"
                sizes="40px"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
