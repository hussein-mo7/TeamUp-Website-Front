import type { Metadata } from "next";
import { EditProfilePage } from "@/components/pages";

export const metadata: Metadata = {
  title: "TeamUp — Edit Profile",
};

const ProfileEditPage = () => <EditProfilePage />;

export default ProfileEditPage;
