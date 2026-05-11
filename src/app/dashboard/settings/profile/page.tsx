"use client";

import { Breadcrumb } from "@/components/ui/navigation";
import { EditProfileForm, SettingsShell } from "@/components/sections/dashboard";
import { useCurrentUser } from "@/hooks/useUser";
import { useUniversityName } from "@/hooks/useInstitution";
import { getAvatarSrc, getDisplayRole, getFullName } from "@/lib/user";

const SettingsProfilePage = () => {
  const { data: currentUser } = useCurrentUser();
  const displayUser = currentUser?.user ?? null;
  const academicProfile = displayUser?.academicProfile ?? null;
  const universityLookup = useUniversityName(displayUser?.universityId ?? null);
  const displayRole = displayUser ? getDisplayRole(displayUser.role) : "User";
  const isMentor = displayRole === "Mentor";
  const displayName = displayUser
    ? getFullName(displayUser.firstName, displayUser.lastName) || displayUser.username
    : "Edit Profile";
  const university = universityLookup.isLoading && displayUser?.universityId ? "Loading..." : universityLookup.universityName;

  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: isMentor ? "Main Mentor Dashboard" : "Main Student Dashboard",
            href: "/dashboard",
          },
          { label: "Settings", href: "/dashboard/settings/profile" },
          { label: isMentor ? "Mentor Profile" : "Student Profile" },
        ]}
      />
      <SettingsShell>
        <div className="p-4 sm:p-6 md:p-8">
          <EditProfileForm
            initialName={displayName}
            initialRole={displayRole}
            initialUniversity={university}
            initialMajor={academicProfile?.major ?? ""}
            initialSkills={academicProfile?.skills ?? []}
            initialBio={displayUser?.bio ?? ""}
            initialAvatar={getAvatarSrc(displayUser?.profilePictureUrl)}
            actionsAlign="start"
            cancelHref="/dashboard/profile"
            isMentor={isMentor}
          />
        </div>
      </SettingsShell>
    </div>
  );
};

export default SettingsProfilePage;
