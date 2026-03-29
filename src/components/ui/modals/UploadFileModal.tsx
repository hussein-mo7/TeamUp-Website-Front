"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/buttons";
import { FileDropzone } from "@/components/ui/forms";

export interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called when the user confirms with the chosen file(s). */
  onUpload: (files: File[]) => void;
  /** Passed to `<input type="file" accept={...} />` — e.g. `.pdf` or `application/pdf,.doc` */
  accept?: string;
  multiple?: boolean;
  title?: string;
  /** Left hint under the drop zone */
  supportedFormatsLabel?: string;
  /** Right hint under the drop zone */
  maxSizeLabel?: string;
  uploadButtonLabel?: string;
}

const UploadFileModal = ({
  isOpen,
  onClose,
  onUpload,
  accept = ".pdf,application/pdf",
  multiple = false,
  title = "Upload File",
  supportedFormatsLabel = "Supported Formats : .pdf",
  maxSizeLabel = "Maximum size : 25 MB",
  uploadButtonLabel = "Upload",
}: UploadFileModalProps) => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!isOpen) setFiles([]);
  }, [isOpen]);

  const handleClose = () => {
    setFiles([]);
    onClose();
  };

  const handleConfirm = () => {
    if (!files.length) return;
    onUpload(files);
    setFiles([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="w-full max-w-lg p-6 sm:p-8"
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
    >
      <div className="flex flex-col">
        <h2
          id="upload-file-title"
          className="pr-10 font-primary text-lg font-bold leading-tight text-content"
        >
          {title}
        </h2>

        <FileDropzone
          id="upload-file-modal-input"
          value={files}
          onChange={setFiles}
          accept={accept}
          multiple={multiple}
          supportedFormatsLabel={supportedFormatsLabel}
          maxSizeLabel={maxSizeLabel}
          className="mt-6"
        />

        <Button
          type="button"
          variant="primary"
          size="md"
          className="mt-6 w-full justify-center"
          disabled={!files.length}
          onClick={handleConfirm}
        >
          {uploadButtonLabel}
        </Button>
      </div>
    </Modal>
  );
};

export default UploadFileModal;
