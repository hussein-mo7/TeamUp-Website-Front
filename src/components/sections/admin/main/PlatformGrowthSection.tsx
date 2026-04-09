"use client";

import { useState } from "react";
import { Heading } from "@/components/ui/typography";
import { PlatformGrowthChart } from "./PlatformGrowthChart";

export const PlatformGrowthSection = () => {
  const [chartRange, setChartRange] = useState<"Year" | "Month">("Year");

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <Heading
            level="h5"
            className="text-lg font-semibold text-content sm:text-xl"
          >
            Platform Growth
          </Heading>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 sm:gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-primary" /> Users
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-accent" /> Projects
            </span>
          </div>
        </div>
        <select
          className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 font-primary text-xs text-slate-600 sm:w-auto"
          value={chartRange}
          onChange={(e) => setChartRange(e.target.value as "Year" | "Month")}
          aria-label="Chart range"
        >
          <option>Year</option>
          <option>Month</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-[#FBFCFE] px-2 pb-2 pt-2 sm:px-3 sm:pb-3 sm:pt-4 mt-8">
        <PlatformGrowthChart range={chartRange} />
      </div>
    </article>
  );
};
