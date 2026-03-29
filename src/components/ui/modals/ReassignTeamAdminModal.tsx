"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/buttons";
import { Input, PasswordInput, Select } from "@/components/ui/forms";

export interface ReassignTeamAdminSelectOption {
  value: string;
  label: string;
}

export interface ReassignTeamAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Read-only current admin display name. */
  currentAdminName: string;
  /** Eligible members (excluding current admin); first option “Select” is added internally. */
  newAdminOptions: ReassignTeamAdminSelectOption[];
  onConfirm?: (payload: { newAdminId: string; password: string }) => void;
}

const ReassignTeamAdminModal = ({
  isOpen,
  onClose,
  currentAdminName,
  newAdminOptions,
  onConfirm,
}: ReassignTeamAdminModalProps) => {
  const [newAdminId, setNewAdminId] = useState("");
  const [password, setPassword] = useState("");

  const selectOptions = [
    { value: "", label: "Select" },
    ...newAdminOptions,
  ];

  useEffect(() => {
    if (isOpen) {
      setNewAdminId("");
      setPassword("");
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (!newAdminId.trim() || !password.trim()) return;
    if (onConfirm) {
      onConfirm({ newAdminId, password });
    } else {
      console.log("re-assign team admin (mock)", { newAdminId });
    }
    onClose();
  };

  const canSubmit = Boolean(newAdminId.trim() && password.trim());

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
      className="w-full max-w-lg p-4 sm:p-6"
    >
      <div className="flex flex-col pr-2 sm:pr-0">
        <h2
          id="reassign-admin-title"
          className="pr-8 font-primary text-lg font-bold leading-tight text-content sm:text-xl"
        >
          Re-assign Team Admin
        </h2>
        <p className="mt-3 font-primary text-xs leading-relaxed text-primary">
          You are about to transfer the team leadership. Once confirmed, you will become a
          regular member, and the selected member will have full administrative control.
        </p>

        <div className="mt-6 flex flex-col gap-5">
          <Input
            id="reassign-current-admin"
            label="Current Admin"
            readOnly
            value={currentAdminName}
            className="bg-gray-50 text-content"
          />
          <Select
            id="reassign-new-admin"
            label="Select New Admin"
            options={selectOptions}
            value={newAdminId}
            onChange={(e) => setNewAdminId(e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <label
              htmlFor="reassign-admin-password"
              className="font-primary text-sm font-medium text-content-light"
            >
              Password
            </label>
            <p className="font-primary text-sm text-content">
              Enter your password to confirm this action!
            </p>
            <PasswordInput
              id="reassign-admin-password"
              placeholder="enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3">
          <Button
            type="button"
            variant="danger"
            size="md"
            className="w-full flex-1 sm:min-h-[44px]"
            disabled={!canSubmit}
            onClick={handleConfirm}
          >
            Confirm Transfer
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

export default ReassignTeamAdminModal;
