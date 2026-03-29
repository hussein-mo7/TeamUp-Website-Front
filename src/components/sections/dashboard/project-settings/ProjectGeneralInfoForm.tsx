"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/buttons";
import { variantClasses, sizeClasses } from "@/components/ui/buttons/buttonStyles";
import { Input, Textarea } from "@/components/ui/forms";
import { RequestMentorChangeModal } from "@/components/ui/modals";
import { TEAM_WORKSPACE_HREF } from "@/mock/Dashboard";

export interface ProjectGeneralInfoFormProps {
  initialTitle: string;
  initialDescription: string;
  initialSupervisor: string;
  initialUniversity: string;
  initialMajor: string;
  bannerSrc: string;
}

const ProjectGeneralInfoForm = ({
  initialTitle,
  initialDescription,
  initialSupervisor,
  initialUniversity,
  initialMajor,
  bannerSrc,
}: ProjectGeneralInfoFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [supervisor, setSupervisor] = useState(initialSupervisor);
  const [university, setUniversity] = useState(initialUniversity);
  const [major, setMajor] = useState(initialMajor);
  const [mentorChangeModalOpen, setMentorChangeModalOpen] = useState(false);

  const handleSave = () => {
    console.log("save project settings (mock)", {
      title,
      description,
      supervisor,
      university,
      major,
    });
  };

  return (
    <div className="space-y-5 p-4 sm:p-6 md:p-8">
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <div className="relative aspect-[21/9] min-h-[140px] w-full bg-gray-100 sm:aspect-[3/1]">
          <Image
            src={bannerSrc}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md
                transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              aria-label="Change banner image"
              onClick={() => console.log("change banner (mock)")}
            >
              <Camera className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
        <Input
          id="project-title"
          label="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mt-5">
          <Textarea
            id="project-description"
            label="Project Description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
        <p className="font-primary text-sm font-medium text-content-light">Supervisor</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1">
            <Input
              id="project-supervisor"
              aria-label="Supervisor name"
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="w-full shrink-0 sm:w-auto"
            onClick={() => setMentorChangeModalOpen(true)}
          >
            Change request
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            id="project-university"
            label="University"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />
          <Input
            id="project-major"
            label="Major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="button" variant="primary" size="md" onClick={handleSave}>
          Save
        </Button>
        <Link
          href={TEAM_WORKSPACE_HREF}
          className={`inline-flex items-center justify-center rounded-lg font-primary font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${variantClasses.secondary} ${sizeClasses.md}`}
        >
          Cancel
        </Link>
      </div>

      <RequestMentorChangeModal
        isOpen={mentorChangeModalOpen}
        onClose={() => setMentorChangeModalOpen(false)}
        currentMentor={supervisor}
      />
    </div>
  );
};

export default ProjectGeneralInfoForm;
