"use client";

import Image from "next/image";
import { Heading } from "@/components/ui/typography";
import type { AdminUserDetailRecord } from "@/mock/AdminUsers";
import UserDetailPill from "./UserDetailPill";

interface UserDetailsProfileCardProps {
  user: AdminUserDetailRecord;
  roleLabel?: string;
  roleTone?: "primary" | "success" | "warning";
}

const formatJoinDate = (value: string) => {
  const date = new Date(value);
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${month}.${String(date.getDate()).padStart(2, "0")}.${date.getFullYear()}`;
};

const UserDetailsProfileCard = ({ user, roleLabel, roleTone = "primary" }: UserDetailsProfileCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#FBFCFE] p-4 sm:p-5">
      <div className="flex flex-col items-center text-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-primary sm:h-28 sm:w-28">
          <Image src={user.avatar} alt={user.name} fill unoptimized className="object-cover" sizes="112px" />
        </div>
        <Heading level="h4" className="mt-4 font-semibold text-content">
          {user.name}
        </Heading>
        <p className="mt-1 font-primary text-sm text-slate-500">{user.email}</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <UserDetailPill tone={roleTone}>{roleLabel ?? user.role}</UserDetailPill>
          <UserDetailPill tone="success">{user.status}</UserDetailPill>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
        <p className="font-primary text-sm font-semibold text-content">Join Date</p>
        <p className="mt-1 font-primary text-sm text-slate-500">{formatJoinDate(user.joinedAt)}</p>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
        <p className="font-primary text-sm font-semibold text-content">Bio</p>
        <p className="mt-2 font-primary text-sm leading-relaxed text-slate-500">{user.bio}</p>
      </div>
    </div>
  );
};

export default UserDetailsProfileCard;