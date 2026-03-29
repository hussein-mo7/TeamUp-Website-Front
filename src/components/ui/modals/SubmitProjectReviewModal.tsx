"use client";

import { useEffect, useId, useState } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/buttons";

export interface SubmitProjectReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called with the mentor note when the user confirms */
  onSubmit: (note: string) => void;
}

const SubmitProjectReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
}: SubmitProjectReviewModalProps) => {
  const noteId = useId();
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!isOpen) setNote("");
  }, [isOpen]);

  const handleSubmit = () => {
    onSubmit(note.trim());
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
      className="w-full max-w-lg p-4 sm:p-6"
    >
      <div className="flex flex-col">
        <h2
          id="submit-review-title"
          className="pr-10 font-primary text-lg font-medium leading-tight text-content sm:text-xl"
        >
          Submit Project for Review
        </h2>
        <p className="mt-3 font-primary text-sm leading-relaxed text-content-light">
          Once submitted, your mentor will be notified to review your work and provide feedback.
        </p>

        <label htmlFor={noteId} className="mt-6 font-primary text-sm  text-content-light">
          Note to Mentor
        </label>
        <textarea
          id={noteId}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={6}
          placeholder="Add any context or questions for your mentor…"
          className="mt-2 w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-2.5 font-primary text-sm text-content placeholder:text-content-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-lg bg-success px-4 py-2.5 font-primary text-sm font-medium text-white shadow-sm transition-opacity duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-success/50 focus-visible:ring-offset-2 sm:flex-1"
          >
            Submit to Mentor
          </button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="w-full sm:flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SubmitProjectReviewModal;
