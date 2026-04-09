"use client";

import { Users, UsersRound, Lightbulb, Settings2 } from "lucide-react";
import { LinkButton } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import { ADMIN_QUICK_ACTIONS } from "@/mock/AdminDashboard";

export const QuickActionsSection = () => {
  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-gray-50 p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
      <Heading level="h5" className="font-semibold text-content-light">
        Quick Actions
      </Heading>
      <div className="mt-4 flex flex-col gap-3">
        {ADMIN_QUICK_ACTIONS.map((action, index) => {
          const iconNames = [Users, UsersRound, Lightbulb, Settings2] as const;
          const Icon = iconNames[index] ?? Settings2;
          const active = index === 0;

          return (
            <LinkButton
              key={action.label}
              href={action.href}
              variant="secondary"
              size="md"
              className={`h-16 !justify-start rounded-xl border px-4 text-left ${
                active ? "border-primary" : "border-slate-100"
              }`}
            >
              <span className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className="font-primary text-sm font-medium">
                {action.label}
              </span>
            </LinkButton>
          );
        })}
      </div>
    </aside>
  );
};
