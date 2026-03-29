"use client";

import { useState } from "react";
import { Download, File } from "lucide-react";
import type { MockWorkspaceFile } from "@/mock/TeamWorkspace";
import { UploadFileModal } from "@/components/ui/modals";
import WorkspaceCard from "./WorkspaceCard";
import { Button, IconButton } from "@/components/ui/buttons";

interface SharedFilesCardProps {
  files: MockWorkspaceFile[];
  isLead: boolean;
}

function formatSizeLabel(bytes: number): string {
  if (bytes < 1024) return `${bytes} b`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kb`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} mb`;
}

const SharedFilesCard = ({ files: initialFiles, isLead }: SharedFilesCardProps) => {
  const [files, setFiles] = useState(initialFiles);
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <WorkspaceCard title="Shared Files">
      <ul className="mb-4 flex flex-col gap-3">
        {files.map((f) => (
          <li
            key={f.id}
            className="flex items-start gap-3 rounded-lg border border-transparent py-1 transition-colors hover:border-gray-100 hover:bg-gray-50/80"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
              <File className="h-5 w-5 text-primary" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-primary text-sm font-medium text-content">{f.name}</p>
              <p className="mt-0.5 font-primary text-[11px] text-content-light">
                uploaded by {f.uploadedBy} · {f.sizeLabel}
              </p>
            </div>
            <IconButton
              type="button"
              variant="ghost"
              size="sm"
              aria-label={`Download ${f.name}`}
              onClick={() => console.log("download (mock)", f.id)}
            >
              <Download className="text-primary" />
            </IconButton>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        variant="primary"
        size="md"
        disabled={!isLead}
        className={`w-full ${!isLead ? "bg-gray-100 text-content-muted hover:bg-gray-100" : ""}`}
        onClick={() => setUploadOpen(true)}
      >
        Add New File
      </Button>

      <UploadFileModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={(uploaded) => {
          const file = uploaded[0];
          if (!file) return;
          setFiles((prev) => [
            ...prev,
            {
              id: Date.now(),
              name: file.name,
              uploadedBy: "you",
              sizeLabel: formatSizeLabel(file.size),
            },
          ]);
          console.log("upload (mock)", file.name);
        }}
      />
    </WorkspaceCard>
  );
};

export default SharedFilesCard;
