"use client";

import { StatsSection } from "./StatsSection";
import { PlatformGrowthSection } from "./PlatformGrowthSection";
import { ProjectStatusSection } from "./ProjectStatusSection";
import { RecentProjectIdeasSection } from "./RecentProjectIdeasSection";
import { QuickActionsSection } from "./QuickActionsSection";

const AdminMainDashboardView = () => {
  return (
    <div className="flex flex-col gap-5">
      <StatsSection />

      <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
        <PlatformGrowthSection />
        <ProjectStatusSection />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <RecentProjectIdeasSection />
        <QuickActionsSection />
      </section>
    </div>
  );
};

export default AdminMainDashboardView;
