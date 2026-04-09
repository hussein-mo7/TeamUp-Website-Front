import type { AdminUserStatus } from "@/mock/AdminUsers";

interface UserStatusBadgeProps {
  status: AdminUserStatus;
}

const statusClasses: Record<AdminUserStatus, string> = {
  Pending: "bg-amber-50 text-amber-600 ring-amber-100",
  Active: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  Blocked: "bg-rose-50 text-rose-600 ring-rose-100",
};

export const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-primary text-[11px] font-semibold ring-1 ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
};
