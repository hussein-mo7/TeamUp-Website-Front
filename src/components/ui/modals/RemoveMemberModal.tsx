"use client";

import Modal from "./Modal";

export interface RemoveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  memberName: string;
}

const RemoveMemberModal = ({
  isOpen,
  onClose,
  onConfirm,
  memberName,
}: RemoveMemberModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
      className="w-full max-w-md p-4 sm:p-6"
    >
      <div className="flex flex-col">
        <h2
          id="remove-member-title"
          className="pr-10 font-primary text-xl font-bold leading-tight text-error"
        >
          Delete member
        </h2>
        <p
          id="remove-member-description"
          className="mt-4 text-center font-primary text-sm leading-relaxed text-content"
        >
          Are you sure you want to delete the member{" "}
          <span className="font-semibold text-primary">{memberName}</span> permanently?
        </p>
        <button
          type="button"
          onClick={handleConfirm}
          className="mt-6 w-full rounded-xl bg-error py-3.5 font-primary text-sm font-semibold text-content-inverse shadow-sm transition-opacity duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-error/45 focus-visible:ring-offset-2"
        >
          Delete member
        </button>
      </div>
    </Modal>
  );
};

export default RemoveMemberModal;
