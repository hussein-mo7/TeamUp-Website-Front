"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

export interface FileDropzoneProps {
  id?: string;
  /** Selected files (controlled). */
  value: File[];
  onChange: (files: File[]) => void;
  /** Passed to `<input type="file" />`. */
  accept?: string;
  multiple?: boolean;
  supportedFormatsLabel?: string;
  maxSizeLabel?: string;
  className?: string;
}

const FileDropzone = ({
  id = "file-dropzone-input",
  value,
  onChange,
  accept = ".pdf,application/pdf",
  multiple = false,
  supportedFormatsLabel = "Supported Formats : pdf",
  maxSizeLabel = "Maximum size : 25 MB",
  className = "",
}: FileDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const pickFiles = useCallback(
    (list: FileList | null) => {
      if (!list?.length) return;
      onChange(multiple ? Array.from(list) : [list[0]]);
    },
    [multiple, onChange],
  );

  const openPicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    pickFiles(e.dataTransfer.files);
  };

  return (
    <div className={className}>
      <input
        id={id}
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          pickFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary bg-white px-4 py-12 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/50
          ${dragOver ? "bg-primary-light/40" : "hover:bg-primary-light/25"}`}
      >
        <UploadCloud
          className="mb-4 h-14 w-14 text-primary"
          strokeWidth={1.25}
          aria-hidden="true"
        />
        <p className="text-center font-primary text-sm text-content-light">
          Drag & Drop your Files or{" "}
          <button
            type="button"
            className="font-semibold text-primary underline-offset-2 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              openPicker();
            }}
          >
            Browse
          </button>
        </p>
        {value.length > 0 ? (
          <p className="mt-3 max-w-full truncate px-2 font-primary text-xs font-medium text-content">
            {multiple
              ? `${value.length} file(s) selected`
              : value[0]?.name ?? ""}
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <p className="font-primary text-xs text-content-light">{supportedFormatsLabel}</p>
        <p className="font-primary text-xs text-content-light">{maxSizeLabel}</p>
      </div>
    </div>
  );
};

export default FileDropzone;
