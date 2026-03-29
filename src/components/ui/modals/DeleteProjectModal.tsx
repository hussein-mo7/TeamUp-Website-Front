"use client";

import Modal from "./Modal";

export interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteProjectModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteProjectModalProps) => {
  const handleDelete = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
      className="max-w-md w-full p-4 sm:p-6"
    >
      <div className="flex flex-col">
        <h2
          id="delete-project-title"
          className="pr-10 font-primary text-xl font-bold leading-tight text-error"
        >
          Delete Project
        </h2>
        <p
          id="delete-project-description"
          className="mt-4 text-center font-primary text-sm leading-relaxed text-content-light"
        >
          Are you sure you want to permanently delete this project? This action
          cannot be undone.
        </p>
        <button
          type="button"
          onClick={handleDelete}
          className="mt-5 w-full rounded-xl bg-error py-3.5 font-primary text-sm font-semibold text-content-inverse
            shadow-sm transition-opacity duration-200 hover:opacity-90 focus:outline-none
            focus-visible:ring-2 focus-visible:ring-error/45 focus-visible:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteProjectModal;
