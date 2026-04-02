import type { Metadata } from "next";
import { MyProfilePage } from "@/components/pages";

export const metadata: Metadata = {
  title: "TeamUp — My Profile",
};

const ProfilePage = () => <MyProfilePage />;

export default ProfilePage;