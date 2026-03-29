import { redirect } from "next/navigation";
import { PROJECT_SETTINGS_NAV_LINKS } from "@/mock/Dashboard";

export default function ProjectSettingsIndexPage() {
  redirect(PROJECT_SETTINGS_NAV_LINKS[0].href);
}
