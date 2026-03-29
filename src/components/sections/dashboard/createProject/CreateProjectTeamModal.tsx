"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Modal from "@/components/ui/modals/Modal";
import { Button } from "@/components/ui/buttons";
import {
  variantClasses,
  sizeClasses,
} from "@/components/ui/buttons/buttonStyles";
import {
  Checkbox,
  FileDropzone,
  Input,
  Select,
  Textarea,
  TagInput,
} from "@/components/ui/forms";
import {
  CREATE_PROJECT_CATEGORY_OPTIONS,
  CREATE_PROJECT_MAJOR_OPTIONS,
  CREATE_PROJECT_UNIVERSITY_OPTIONS,
  MOCK_NEW_MENTOR_OPTIONS,
  TEAM_WORKSPACE_HREF,
} from "@/mock/Dashboard";

export interface CreateProjectTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mentorOptions = [
  { value: "", label: "Select" },
  ...MOCK_NEW_MENTOR_OPTIONS,
];

const CreateProjectTeamModal = ({
  isOpen,
  onClose,
}: CreateProjectTeamModalProps) => {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const [title, setTitle] = useState("Team Up");
  const [category, setCategory] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [logoFiles, setLogoFiles] = useState<File[]>([]);

  const [teamSize, setTeamSize] = useState("5");
  const [techStack, setTechStack] = useState<string[]>([
    "ui design",
    "Ux design",
    "web design",
  ]);
  const [rolesNeeded, setRolesNeeded] = useState<string[]>([
    "ui design",
    "Ux design",
    "web design",
  ]);
  const [mentorId, setMentorId] = useState("");
  const [postPublic, setPostPublic] = useState(true);

  const reset = () => {
    setStep(0);
    setTitle("Team Up");
    setCategory("");
    setUniversity("");
    setMajor("");
    setShortDescription("");
    setLogoFiles([]);
    setTeamSize("5");
    setTechStack(["ui design", "Ux design", "web design"]);
    setRolesNeeded(["ui design", "Ux design", "web design"]);
    setMentorId("");
    setPostPublic(true);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleCreate = () => {
    console.log("create project team (mock)", {
      title,
      category,
      university,
      major,
      shortDescription,
      teamSize,
      techStack,
      rolesNeeded,
      mentorId,
      postPublic,
    });
    setStep(2);
  };

  /*
   * Form steps: fixed height so inner overflow-y-auto scrolls. Success step: shrink to content
   * so the card is not a tall empty box. Lenis: data-lenis-prevent on Modal root.
   */
  const isSuccess = step === 2;
  const panelShellClass = isSuccess
    ? "flex h-auto w-full max-w-lg flex-col overflow-hidden"
    : "flex h-[min(85vh,100dvh)] w-full max-w-lg flex-col min-h-0 overflow-hidden";

  const panelScrollClass = isSuccess
    ? "px-4 pb-8 pt-11 sm:px-6 sm:pb-10 sm:pt-12"
    : "modal-panel-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 pt-11 sm:px-6 sm:pb-8 sm:pt-12";

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={panelShellClass}
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
    >
      <div className={panelScrollClass}>
        {step === 2 ? (
          <div className="flex flex-col items-center px-2 pb-2 text-center sm:px-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-500 shadow-sm ring-4 ring-emerald-500/20"
              aria-hidden="true"
            >
              <Check className="h-9 w-9 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="mt-5 font-primary text-lg font-bold leading-snug text-content sm:text-xl">
              Congratulations! Your project is live. 🚀
            </h2>
            <p className="mt-3 max-w-sm font-primary text-sm leading-relaxed text-content-light">
              Your project is now visible to other students and your request has
              been sent to your selected mentor.
            </p>
            <Link
              href={TEAM_WORKSPACE_HREF}
              onClick={handleClose}
              className={`mt-8 inline-flex w-full max-w-sm items-center justify-center rounded-lg font-primary font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${variantClasses.primary} ${sizeClasses.md}`}
            >
              Go to Team Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex flex-col pr-1 sm:pr-0">
            <h2 className="pr-8 font-primary text-lg font-bold leading-tight text-content sm:text-xl">
              Create Project Team
            </h2>

            {step === 0 ? (
              <div className="mt-6 flex flex-col gap-5">
                <Input
                  id="create-project-title"
                  label="Project Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Select
                  id="create-project-category"
                  label="Category"
                  options={CREATE_PROJECT_CATEGORY_OPTIONS}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <Select
                  id="create-project-university"
                  label="University"
                  options={CREATE_PROJECT_UNIVERSITY_OPTIONS}
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
                <Select
                  id="create-project-major"
                  label="Major"
                  options={CREATE_PROJECT_MAJOR_OPTIONS}
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
                <Textarea
                  id="create-project-short-desc"
                  label="Short Description"
                  rows={4}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder=""
                />
                <div>
                  <p className="mb-2 font-primary text-sm font-medium text-content-light">
                    Project Logo
                  </p>
                  <FileDropzone
                    id="create-project-logo"
                    value={logoFiles}
                    onChange={setLogoFiles}
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    supportedFormatsLabel="PNG, JPG, WebP"
                    maxSizeLabel="Maximum size : 5 MB"
                  />
                </div>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-5">
                <Input
                  id="create-team-size"
                  label="Team Size"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                />
                <TagInput
                  id="create-tech-stack"
                  label="Tech Stack"
                  value={techStack}
                  onChange={setTechStack}
                  placeholder="Add and press Enter"
                  variant="bordered"
                />
                <TagInput
                  id="create-roles-needed"
                  label="Roles Needed"
                  value={rolesNeeded}
                  onChange={setRolesNeeded}
                  placeholder="Add and press Enter"
                  variant="bordered"
                />
                <div>
                  <Select
                    id="create-mentor"
                    label="Choose a Mentor"
                    options={mentorOptions}
                    value={mentorId}
                    onChange={(e) => setMentorId(e.target.value)}
                  />
                  <p className="mt-2 font-primary text-xs italic text-emerald-600">
                    You can select a mentor from the list to submit a request to
                    supervise your project.
                  </p>
                </div>
                <Checkbox
                  id="create-post-public"
                  label="Post the project on the projects page to receive applications to join."
                  checked={postPublic}
                  onChange={(e) => setPostPublic(e.target.checked)}
                />
              </div>
            )}

            <div className="mt-8 flex items-center gap-3">
              <div className="min-w-[4.5rem] shrink-0">
                {step === 1 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => setStep(0)}
                  >
                    Back
                  </Button>
                ) : (
                  <span className="inline-block w-px" aria-hidden="true" />
                )}
              </div>
              <div className="flex flex-1 justify-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${step === 0 ? "bg-primary" : "bg-gray-200"}`}
                  aria-hidden="true"
                />
                <span
                  className={`h-2 w-2 rounded-full ${step === 1 ? "bg-primary" : "bg-gray-200"}`}
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-[4.5rem] shrink-0 flex justify-end">
                {step === 0 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    className="gap-1 text-primary"
                    onClick={() => setStep(1)}
                  >
                    Next
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={handleCreate}
                  >
                    Create Project
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreateProjectTeamModal;
