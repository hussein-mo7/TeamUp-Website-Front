"use client";

import { Heading } from "@/components/ui/typography";
import { ProjectStatusDonut } from "./ProjectStatusDonut";

export const ProjectStatusSection = () => {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-5">
      <Heading
        level="h5"
        className="text-center text-lg font-semibold text-content-light sm:text-xl"
      >
        Project Status Distribution
      </Heading>
      <div className="mt-10 flex flex-col items-center justify-center gap-4">
        <ProjectStatusDonut />
      </div>
    </article>
  );
};
