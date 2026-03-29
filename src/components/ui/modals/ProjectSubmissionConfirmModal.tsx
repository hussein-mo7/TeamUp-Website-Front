"use client";

import Modal from "./Modal";
import { Button } from "@/components/ui/buttons";

export interface ProjectSubmissionConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ProjectSubmissionConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ProjectSubmissionConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
      className="w-full max-w-md p-4 sm:p-6"
    >
      <div className="flex flex-col pr-2 sm:pr-0">
        <h2
          id="project-submission-confirm-title"
          className="pr-8 font-primary text-lg font-bold leading-tight text-primary sm:text-xl"
        >
          Project Submission
        </h2>
        <p className="mt-4 font-primary text-sm leading-relaxed text-content-light">
          Are you sure? You will not be able to edit any files or change team members after this
          step.
        </p>
        <Button
          type="button"
          variant="primary"
          size="md"
          className="mt-8 w-full justify-center"
          onClick={onConfirm}
        >
          Submission
        </Button>
      </div>
    </Modal>
  );
};

export default ProjectSubmissionConfirmModal;
