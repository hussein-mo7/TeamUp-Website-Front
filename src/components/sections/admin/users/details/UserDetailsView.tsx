"use client";

import type { AdminUserDetailRecord } from "@/mock/AdminUsers";
import MentorDetailsView from "./MentorDetailsView";
import GraduateDetailsView from "./GraduateDetailsView";
import StudentDetailsView from "./StudentDetailsView";

interface UserDetailsViewProps {
  user: AdminUserDetailRecord;
}

const UserDetailsView = ({ user }: UserDetailsViewProps) => {
  if (user.role === "Mentor") {
    return <MentorDetailsView user={user} />;
  }

  if (user.role === "Graduate") {
    return <GraduateDetailsView user={user} />;
  }

  return <StudentDetailsView user={user} />;
};

export default UserDetailsView;
