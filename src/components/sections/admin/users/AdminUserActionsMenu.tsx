"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  Eye,
  MoreVertical,
  UserCheck,
  UserX,
} from "lucide-react";
import { IconButton } from "@/components/ui/buttons";
import type { AdminUserAction, AdminUserRecord } from "@/mock/AdminUsers";

interface AdminUserActionsMenuProps {
  user: AdminUserRecord;
  onAction: (action: AdminUserAction, user: AdminUserRecord) => void;
}

const AdminUserActionsMenu = ({ user, onAction }: AdminUserActionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onDocumentClick = (event: MouseEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", onDocumentClick);
    return () => document.removeEventListener("mousedown", onDocumentClick);
  }, [open]);

  const actions = useMemo(() => {
    if (user.status === "Pending") {
      return [
        {
          action: "approve" as const,
          label: "Approve",
          icon: CheckCircle2,
          textClass: "text-emerald-600",
        },
        {
          action: "warn" as const,
          label: "Warn user",
          icon: AlertTriangle,
          textClass: "text-amber-600",
        },
        {
          action: "reject" as const,
          label: "Reject",
          icon: Ban,
          textClass: "text-rose-600",
        },
      ];
    }

    if (user.status === "Blocked") {
      return [
        {
          action: "enable" as const,
          label: "Enable",
          icon: UserCheck,
          textClass: "text-emerald-600",
        },
        {
          action: "warn" as const,
          label: "Warn user",
          icon: AlertTriangle,
          textClass: "text-amber-600",
        },
      ];
    }

    return [
      {
        action: "disable" as const,
        label: "Disable",
        icon: UserX,
        textClass: "text-rose-600",
      },
      {
        action: "warn" as const,
        label: "Warn user",
        icon: AlertTriangle,
        textClass: "text-amber-600",
      },
    ];
  }, [user.status]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <IconButton
        type="button"
        variant="ghost"
        size="sm"
        aria-label={`Actions for ${user.name}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="rounded-full text-content-light hover:bg-slate-100"
      >
        <MoreVertical className="h-4 w-4" />
      </IconButton>

      {open ? (
        <div className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1 shadow-[0_14px_32px_rgba(15,23,42,0.12)]">
          <Link
            href={`/admin/users/${user.id}`}
            className="flex items-center gap-2 px-3 py-2 font-primary text-xs text-content transition-colors hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            <Eye className="h-3.5 w-3.5 text-content-light" />
            View profile
          </Link>

          <div className="my-1 h-px bg-slate-100" />

          {actions.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.action}
                type="button"
                className={`flex w-full items-center gap-2 px-3 py-2 text-left font-primary text-xs transition-colors hover:bg-slate-50 ${item.textClass}`}
                onClick={() => {
                  setOpen(false);
                  onAction(item.action, user);
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default AdminUserActionsMenu;
