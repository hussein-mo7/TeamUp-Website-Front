"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpDown } from "lucide-react";
import type {
  AdminUserAction,
  AdminUserRecord,
} from "@/mock/AdminUsers";
import AdminUserActionsMenu from "./AdminUserActionsMenu";
import { UserStatusBadge } from "./UserStatusBadge";

interface UsersTableProps {
  users: AdminUserRecord[];
  selectedIds: Set<number>;
  onToggleUser: (id: number) => void;
  onToggleSelectAll: (userIds: number[]) => void;
  onUserAction: (action: AdminUserAction, user: AdminUserRecord) => void;
  onToggleSort: () => void;
  sortDirection: "asc" | "desc";
}

const roleClasses: Record<AdminUserRecord["role"], string> = {
  Student: "text-blue-500",
  Mentor: "text-emerald-500",
  Graduate: "text-amber-500",
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const UsersTable = ({
  users,
  selectedIds,
  onToggleUser,
  onToggleSelectAll,
  onUserAction,
  onToggleSort,
  sortDirection,
}: UsersTableProps) => {
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const allSelected = users.length > 0 && users.every((user) => selectedIds.has(user.id));
  const someSelected = users.some((user) => selectedIds.has(user.id));

  useEffect(() => {
    if (!selectAllRef.current) return;
    selectAllRef.current.indeterminate = someSelected && !allSelected;
  }, [allSelected, someSelected]);

  const userIds = useMemo(() => users.map((user) => user.id), [users]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[960px] w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-slate-50/80 text-left font-primary text-[11px] uppercase tracking-wide text-slate-400">
            <th className="w-12 border-b border-slate-100 px-4 py-4">
              <input
                ref={selectAllRef}
                type="checkbox"
                checked={allSelected}
                onChange={() => onToggleSelectAll(userIds)}
                aria-label="Select all users on the current page"
                className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary accent-primary focus:ring-primary"
              />
            </th>
            <th className="border-b border-slate-100 px-4 py-4">Name</th>
            <th className="border-b border-slate-100 px-4 py-4">Email</th>
            <th className="border-b border-slate-100 px-4 py-4">Status</th>
            <th className="border-b border-slate-100 px-4 py-4">Role</th>
            <th className="border-b border-slate-100 px-4 py-4">
              <button
                type="button"
                onClick={onToggleSort}
                className="inline-flex items-center gap-1 text-left transition-colors hover:text-slate-600"
                aria-label={`Sort by join date ${sortDirection === "desc" ? "descending" : "ascending"}`}
              >
                Join Date
                <ArrowUpDown size={12} aria-hidden="true" className="shrink-0" />
              </button>
            </th>
            <th className="border-b border-slate-100 px-4 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSelected = selectedIds.has(user.id);

            return (
              <tr
                key={user.id}
                className={`text-sm text-content transition-colors hover:bg-slate-50/80 ${
                  isSelected ? "bg-primary/5" : ""
                }`}
              >
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleUser(user.id)}
                    aria-label={`Select ${user.name}`}
                    className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary accent-primary focus:ring-primary"
                  />
                </td>
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-primary text-sm font-medium text-content">
                        {user.name}
                      </p>
                      <p className="truncate font-primary text-xs text-slate-500">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="border-b border-slate-100 px-4 py-4 font-primary text-xs text-slate-500 align-middle">
                  {user.email}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <UserStatusBadge status={user.status} />
                </td>
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <span className={`font-primary text-sm font-medium ${roleClasses[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="border-b border-slate-100 px-4 py-4 font-primary text-sm text-slate-600 align-middle">
                  {formatDate(user.joinedAt)}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 text-right align-middle">
                  <div className="inline-flex justify-end">
                    <AdminUserActionsMenu
                      user={user}
                      onAction={onUserAction}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {users.length === 0 ? (
        <div className="border-b border-slate-100 px-4 py-16 text-center font-primary text-sm text-slate-500">
          No users found for the current search and filter settings.
        </div>
      ) : null}
    </div>
  );
};

export default UsersTable;
