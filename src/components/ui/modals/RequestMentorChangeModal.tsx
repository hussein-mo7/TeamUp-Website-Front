"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/buttons";
import { Input, Select, Textarea } from "@/components/ui/forms";
import { MOCK_NEW_MENTOR_OPTIONS } from "@/mock/Dashboard";

export interface RequestMentorChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Read-only value shown as current mentor (e.g. supervisor name). */
  currentMentor: string;
  onSendRequest?: (payload: { newMentorId: string; reason: string }) => void;
}

const mentorSelectOptions = [
  { value: "", label: "Select" },
  ...MOCK_NEW_MENTOR_OPTIONS,
];

const RequestMentorChangeModal = ({
  isOpen,
  onClose,
  currentMentor,
  onSendRequest,
}: RequestMentorChangeModalProps) => {
  const [newMentorId, setNewMentorId] = useState("");
  const [reason, setReason] = useState("");
  const [understood, setUnderstood] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setNewMentorId("");
      setReason("");
      setUnderstood(true);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!newMentorId.trim() || !reason.trim() || !understood) return;
    if (onSendRequest) {
      onSendRequest({ newMentorId, reason: reason.trim() });
    } else {
      console.log("request mentor change (mock)", {
        currentMentor,
        newMentorId,
        reason: reason.trim(),
      });
    }
    onClose();
  };

  const canSubmit =
    Boolean(newMentorId.trim()) && reason.trim().length > 0 && understood;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
      className="w-full max-w-xl p-4 sm:p-6"
    >
      <div className="flex flex-col pr-2 sm:pr-0">
        <h2
          id="request-mentor-title"
          className="pr-8 font-primary text-lg font-bold leading-tight text-content sm:text-xl"
        >
          Request Mentor Change
        </h2>
        <p className="mt-3 font-primary text-xs leading-relaxed text-primary">
          &ldquo;Please select a new mentor and provide a reason for the change.
          This request will be sent to the department for approval&rdquo;
        </p>

        <div className="mt-6 flex flex-col gap-5">
          <Input
            id="current-mentor"
            label="Current Mentor"
            readOnly
            value={currentMentor}
            className="bg-gray-50 text-content"
          />
          <Select
            id="new-mentor"
            label="New Mentor Selection"
            options={mentorSelectOptions}
            value={newMentorId}
            onChange={(e) => setNewMentorId(e.target.value)}
          />
          <Textarea
            id="mentor-change-reason"
            label="Reason for Change"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder=""
          />
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={understood}
            onChange={(e) => setUnderstood(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-gray-300 text-primary accent-primary
              focus:ring-2 focus:ring-primary/25 focus:ring-offset-0 cursor-pointer"
          />
          <span className="font-primary text-xs leading-snug text-content-light">
            I understand that this change might affect the project&apos;s
            timeline and requires official approval
          </span>
        </label>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            className="w-full flex-1 sm:min-h-[44px]"
            disabled={!canSubmit}
            onClick={handleSend}
          >
            Send Request
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="w-full flex-1 sm:min-h-[44px]"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RequestMentorChangeModal;
