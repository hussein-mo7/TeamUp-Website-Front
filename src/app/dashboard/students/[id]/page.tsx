import type { Metadata } from "next";
import { StudentProfilePage } from "@/components/pages";

export const metadata: Metadata = {
  title: "TeamUp — Student Profile",
};

const StudentProfileRoute = () => <StudentProfilePage />;

export default StudentProfileRoute;
