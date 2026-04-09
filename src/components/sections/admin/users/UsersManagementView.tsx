"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui/navigation";
import { Heading } from "@/components/ui/typography";
import {
  ADMIN_USERS,
  ADMIN_USERS_PAGE_SIZE_OPTIONS,
  type AdminUserAction,
  type AdminUserRecord,
  type AdminUsersRoleFilter,
  type AdminUsersStatusFilter,
} from "@/mock/AdminUsers";
import UsersToolbar from "./UsersToolbar";
import UsersTable from "./UsersTable";
import UsersBulkActionsBar from "./UsersBulkActionsBar";

const INITIAL_PAGE_SIZE = 12;

const UsersManagementView = () => {
  const [users, setUsers] = useState<AdminUserRecord[]>(ADMIN_USERS);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminUsersStatusFilter>("All");
  const [roleFilter, setRoleFilter] = useState<AdminUsersRoleFilter>("All");
  const [itemsPerPage, setItemsPerPage] = useState(INITIAL_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(() => new Set([29, 30]));
  const [notice, setNotice] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    const search = query.trim().toLowerCase();

    return users.filter((user) => {
      const matchesQuery =
        search.length === 0 ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      return matchesQuery && matchesStatus && matchesRole;
    });
  }, [query, roleFilter, statusFilter, users]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((leftUser, rightUser) => {
      const leftTime = new Date(leftUser.joinedAt).getTime();
      const rightTime = new Date(rightUser.joinedAt).getTime();
      return sortDirection === "desc" ? rightTime - leftTime : leftTime - rightTime;
    });
  }, [filteredUsers, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedUsers = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [itemsPerPage, safeCurrentPage, sortedUsers]);

  const selectedCount = selectedIds.size;

  useEffect(() => {
    setCurrentPage(1);
  }, [query, statusFilter, roleFilter, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setNotice(null);
  }, [query, statusFilter, roleFilter, sortDirection, itemsPerPage]);

  const toggleUserSelection = (userId: number) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  };

  const toggleVisibleUsersSelection = (visibleUserIds: number[]) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      const allVisibleSelected = visibleUserIds.every((userId) => next.has(userId));

      if (allVisibleSelected) {
        visibleUserIds.forEach((userId) => next.delete(userId));
        return next;
      }

      visibleUserIds.forEach((userId) => next.add(userId));
      return next;
    });
  };

  const updateUsersStatus = (userIds: number[], status: AdminUserRecord["status"]) => {
    setUsers((previous) =>
      previous.map((user) =>
        userIds.includes(user.id) ? { ...user, status } : user,
      ),
    );
  };

  const handleRowAction = (action: AdminUserAction, user: AdminUserRecord) => {
    if (action === "warn") {
      setNotice(`Warning sent to ${user.name}`);
      return;
    }

    if (action === "approve" || action === "enable") {
      updateUsersStatus([user.id], "Active");
      setNotice(`${user.name} is now active`);
      return;
    }

    if (action === "reject" || action === "disable") {
      updateUsersStatus([user.id], "Blocked");
      setNotice(`${user.name} has been blocked`);
    }
  };

  const handleBulkApprove = () => {
    const ids = [...selectedIds];
    if (ids.length === 0) return;
    updateUsersStatus(ids, "Active");
    setNotice(`${ids.length} user${ids.length > 1 ? "s" : ""} approved`);
  };

  const handleBulkReject = () => {
    const ids = [...selectedIds];
    if (ids.length === 0) return;
    updateUsersStatus(ids, "Blocked");
    setNotice(`${ids.length} user${ids.length > 1 ? "s" : ""} rejected`);
  };

  return (
    <div className="flex flex-col">
      <Breadcrumb items={[{ label: "Dashboard", href: "/admin" }, { label: "Users Management" }]} />

      <section className="space-y-1 mb-5">
        <Heading level="h4" className="text-[28px] font-semibold text-content sm:text-[30px]">
          Users Management
        </Heading>
        <p className="max-w-2xl font-primary text-sm text-slate-500 sm:text-base">
          Manage and control platform users
        </p>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        <UsersToolbar
          query={query}
          statusFilter={statusFilter}
          roleFilter={roleFilter}
          onQueryChange={setQuery}
          onStatusFilterChange={setStatusFilter}
          onRoleFilterChange={setRoleFilter}
        />

        {notice ? (
          <div className="border-b border-slate-100 px-4 py-3 sm:px-5">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-3 py-2 font-primary text-sm text-primary">
              <CheckCircle2 size={16} aria-hidden="true" />
              {notice}
            </div>
          </div>
        ) : null}

        <UsersTable
          users={paginatedUsers}
          selectedIds={selectedIds}
          onToggleUser={toggleUserSelection}
          onToggleSelectAll={toggleVisibleUsersSelection}
          onUserAction={handleRowAction}
          onToggleSort={() => setSortDirection((previous) => (previous === "desc" ? "asc" : "desc"))}
          sortDirection={sortDirection}
        />

        <div className="flex flex-col gap-4 border-t border-slate-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-3 sm:justify-start">
            <span className="font-primary text-xs text-slate-500 sm:text-sm">Show result:</span>
            <select
              value={itemsPerPage}
              onChange={(event) => setItemsPerPage(Number(event.target.value))}
              className="h-8 w-20 rounded-lg border border-slate-200 bg-white pl-2 pr-8 font-primary text-xs text-slate-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 sm:w-16"
            >
              {ADMIN_USERS_PAGE_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center gap-1 overflow-x-auto pb-1 lg:justify-end lg:pb-0">
            <button
              type="button"
              onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
              disabled={currentPage === 1}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-transparent text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full px-3 font-primary text-sm transition-colors ${
                  safeCurrentPage === page
                    ? "bg-primary/10 text-primary"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
                aria-current={safeCurrentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-transparent text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex justify-center px-4 pb-5 sm:px-5">
          <UsersBulkActionsBar
            selectedCount={selectedCount}
            onApprove={handleBulkApprove}
            onReject={handleBulkReject}
          />
        </div>
      </section>
    </div>
  );
};

export default UsersManagementView;
