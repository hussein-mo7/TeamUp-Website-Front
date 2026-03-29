"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import Modal from "./Modal";
import { variantClasses, sizeClasses } from "@/components/ui/buttons/buttonStyles";
import { TEAM_WORKSPACE_HREF } from "@/mock/Dashboard";

export interface ProjectSubmissionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Mentor name without "Dr." prefix, or full display string. */
  mentorName?: string;
}

const ProjectSubmissionSuccessModal = ({
  isOpen,
  onClose,
  mentorName = "Name",
}: ProjectSubmissionSuccessModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
      className="w-full max-w-md p-4 sm:p-6"
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-sm ring-4 ring-emerald-500/20"
          aria-hidden="true"
        >
          <Check className="h-9 w-9 text-white" strokeWidth={2.5} />
        </div>
        <h2 className="mt-5 font-primary text-lg font-bold leading-snug text-content sm:text-xl">
          Congratulations! Your project is live. 🚀
        </h2>
        <p className="mt-3 font-primary text-sm leading-relaxed text-content-light">
          Your project is now visible to other students and your request has been sent to Dr.{" "}
          {mentorName}
        </p>
        <Link
          href={TEAM_WORKSPACE_HREF}
          onClick={onClose}
          className={`mt-8 inline-flex w-full items-center justify-center rounded-lg font-primary font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${variantClasses.primary} ${sizeClasses.md}`}
        >
          Go to Team Dashboard
        </Link>
      </div>
    </Modal>
  );
};

export default ProjectSubmissionSuccessModal;
