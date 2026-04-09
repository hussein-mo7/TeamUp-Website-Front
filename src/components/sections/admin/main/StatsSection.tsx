"use client";

import {
  Users,
  AlertTriangle,
  FolderOpen,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import { ADMIN_STATS } from "@/mock/AdminDashboard";

const toneClasses = {
  primary: "bg-primary",
  warning: "bg-warning",
  info: "bg-info",
  success: "bg-success",
  danger: "bg-error",
} as const;

const iconMap = {
  users: Users,
  "pending-users": AlertTriangle,
  projects: FolderOpen,
  completed: CheckCircle,
  ideas: Lightbulb,
} as const;

export const StatsSection = () => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {ADMIN_STATS.map((stat) => {
        const Icon = iconMap[stat.icon];
        return (
          <article
            key={stat.label}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-gray-50 px-4 py-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)]"
          >
            <div>
              <p className="font-primary text-xs text-primary">
                {stat.label}
              </p>
              <p className="mt-1 font-primary text-lg font-semibold tracking-tight text-content">
                {stat.value}
              </p>
            </div>
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${toneClasses[stat.tone]}`}
            >
              <Icon size={18} aria-hidden="true" />
            </div>
          </article>
        );
      })}
    </section>
  );
};
