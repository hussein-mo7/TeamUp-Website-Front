export type AdminUserStatus = "Pending" | "Active" | "Blocked";
export type AdminUserRole = "Student" | "Mentor" | "Graduate";
export type AdminUserAction = "approve" | "warn" | "reject" | "disable" | "enable";
export type AdminUsersStatusFilter = "All" | AdminUserStatus;
export type AdminUsersRoleFilter = "All" | AdminUserRole;

export interface AdminUserRecord {
  id: number;
  name: string;
  email: string;
  status: AdminUserStatus;
  role: AdminUserRole;
  joinedAt: string;
  selected: boolean;
  avatar: string;
}

const ADMIN_USER_NAMES = [
  "Wafaa Amjad",
  "Ahmed Hassan",
  "Fatima Khan",
  "Mohammad Ali",
  "Sara Ahmed",
  "Omar Ibrahim",
  "Layla Samir",
  "Hassan Mahdi",
  "Yara Adel",
  "Noor Salem",
  "Alaa Mostafa",
  "Mona Adel",
  "Kareem Adel",
  "Salma Nabil",
  "Youssef Fathy",
  "Rana Tarek",
  "Huda Saeed",
  "Omar Nasser",
  "Dina Sherif",
  "Tamer Ashraf",
  "Lina Farouk",
  "Ziad Hamdi",
  "Reem Youssef",
  "Moustafa Hossam",
  "Nouran Khaled",
  "Khaled Mahmoud",
  "Hana Ali",
  "Feras Mahmoud",
  "Aya Samir",
  "Mahmoud Adel",
];

const ADMIN_USER_ROLES: AdminUserRole[] = [
  "Student",
  "Mentor",
  "Graduate",
  "Student",
  "Mentor",
  "Graduate",
];

const ADMIN_USER_STATUSES: AdminUserStatus[] = [
  "Pending",
  "Active",
  "Active",
  "Blocked",
  "Active",
  "Pending",
  "Active",
  "Blocked",
];

const ADMIN_USER_SELECTED_IDS = new Set([2, 3, 7, 11]);

const slugifyEmail = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.|\.$/g, "");

const buildJoinDate = (index: number) => {
  const date = new Date(Date.UTC(2026, 2, index + 1));
  return date.toISOString();
};

export const ADMIN_USERS: AdminUserRecord[] = ADMIN_USER_NAMES.map((name, index) => ({
  id: index + 1,
  name,
  email: `${slugifyEmail(name)}@teamup.edu`,
  status: ADMIN_USER_STATUSES[index % ADMIN_USER_STATUSES.length],
  role: ADMIN_USER_ROLES[index % ADMIN_USER_ROLES.length],
  joinedAt: buildJoinDate(index),
  selected: ADMIN_USER_SELECTED_IDS.has(index + 1),
  avatar: "/images/user.jpg",
}));

export const ADMIN_USERS_PAGE_SIZE_OPTIONS = [12, 24, 36] as const;
export const ADMIN_USERS_STATUS_FILTERS: AdminUsersStatusFilter[] = [
  "All",
  "Pending",
  "Active",
  "Blocked",
];
export const ADMIN_USERS_ROLE_FILTERS: AdminUsersRoleFilter[] = [
  "All",
  "Student",
  "Mentor",
  "Graduate",
];
