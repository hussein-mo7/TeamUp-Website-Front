// ── Find a Team — mock data ──────────────────────────────────────────────────

export type TeamStatus = "Hiring" | "Full" | "Invite Only";
export type ProjectCategory =
  | "Software"
  | "Design"
  | "AI / ML"
  | "Cybersecurity"
  | "Data Science"
  | "Networking"
  | "Mobile"
  | "Research";

export interface FindTeamMember {
  id: number;
  name: string;
  role: string;
  isAdmin: boolean;
  avatar: string;
}

export interface FindTeamProject {
  id: number;
  name: string;
  description: string;
  fullDescription: string;
  image: string;
  teamCapacity: number;
  currentMembers: number;
  lookingFor: string[];
  techStack: string[];
  category: ProjectCategory;
  status: TeamStatus;
  university: string;
  mentorName: string;
  supervisorName: string;
  postDate: string;
  members: FindTeamMember[];
}

const SHARED_DESCRIPTION =
  "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.";

const FULL_DESCRIPTION =
  "An IoT-based solution designed to monitor and optimize electricity consumption across university facilities. The system uses real-time sensors to control lighting and AC units, providing a comprehensive dashboard for administrators to reduce carbon footprint.";

const MOCK_MEMBERS: FindTeamMember[] = [
  {
    id: 1,
    name: "Student Name",
    role: "Team Admin . Role",
    isAdmin: true,
    avatar: "/images/user.jpg",
  },
  {
    id: 2,
    name: "Student Name",
    role: "Role",
    isAdmin: false,
    avatar: "/images/user.jpg",
  },
  {
    id: 3,
    name: "Student Name",
    role: "Role",
    isAdmin: false,
    avatar: "/images/user.jpg",
  },
];

export const FIND_TEAM_PROJECTS: FindTeamProject[] = [
  {
    id: 1,
    name: "Project Name",
    description: SHARED_DESCRIPTION,
    fullDescription: FULL_DESCRIPTION,
    image: "/images/Team.jpg",
    teamCapacity: 5,
    currentMembers: 3,
    lookingFor: ["UI design", "Strategy", "UI design"],
    techStack: ["ui design", "ui design", "ui design", "ui design"],
    category: "Design",
    status: "Hiring",
    university: "AlAzhar",
    mentorName: "Mentor Name",
    supervisorName: "Dr Name",
    postDate: "12 . nov . 2025",
    members: MOCK_MEMBERS,
  },
  {
    id: 2,
    name: "Project Name",
    description: SHARED_DESCRIPTION,
    fullDescription: FULL_DESCRIPTION,
    image: "/images/Team.jpg",
    teamCapacity: 4,
    currentMembers: 2,
    lookingFor: ["UI design", "UI design"],
    techStack: ["ui design", "ui design"],
    category: "Software",
    status: "Hiring",
    university: "AlAzhar",
    mentorName: "Mentor Name",
    supervisorName: "Dr Name",
    postDate: "14 . nov . 2025",
    members: MOCK_MEMBERS.slice(0, 2),
  },
  {
    id: 3,
    name: "Project Name",
    description: SHARED_DESCRIPTION,
    fullDescription: FULL_DESCRIPTION,
    image: "/images/Team.jpg",
    teamCapacity: 6,
    currentMembers: 4,
    lookingFor: ["UI design", "Strategy"],
    techStack: ["ui design", "Strategy"],
    category: "AI / ML",
    status: "Hiring",
    university: "AlAzhar",
    mentorName: "Mentor Name",
    supervisorName: "Dr Name",
    postDate: "1 . dec . 2025",
    members: MOCK_MEMBERS,
  },
  {
    id: 4,
    name: "Project Name",
    description: SHARED_DESCRIPTION,
    fullDescription: FULL_DESCRIPTION,
    image: "/images/Team.jpg",
    teamCapacity: 5,
    currentMembers: 5,
    lookingFor: ["UI design"],
    techStack: ["ui design"],
    category: "Mobile",
    status: "Full",
    university: "AlAzhar",
    mentorName: "Mentor Name",
    supervisorName: "Dr Name",
    postDate: "5 . dec . 2025",
    members: MOCK_MEMBERS,
  },
  {
    id: 5,
    name: "Project Name",
    description: SHARED_DESCRIPTION,
    fullDescription: FULL_DESCRIPTION,
    image: "/images/Team.jpg",
    teamCapacity: 4,
    currentMembers: 3,
    lookingFor: ["UI design", "Strategy"],
    techStack: ["ui design", "Strategy"],
    category: "Cybersecurity",
    status: "Hiring",
    university: "AlAzhar",
    mentorName: "Mentor Name",
    supervisorName: "Dr Name",
    postDate: "8 . dec . 2025",
    members: MOCK_MEMBERS.slice(0, 2),
  },
  {
    id: 6,
    name: "Project Name",
    description: SHARED_DESCRIPTION,
    fullDescription: FULL_DESCRIPTION,
    image: "/images/Team.jpg",
    teamCapacity: 5,
    currentMembers: 2,
    lookingFor: ["UI design", "UI design"],
    techStack: ["ui design", "ui design"],
    category: "Data Science",
    status: "Hiring",
    university: "AlAzhar",
    mentorName: "Mentor Name",
    supervisorName: "Dr Name",
    postDate: "10 . dec . 2025",
    members: MOCK_MEMBERS.slice(0, 2),
  },
  {
    id: 7,
    name: "Project Name",
    description: SHARED_DESCRIPTION,
    fullDescription: FULL_DESCRIPTION,
    image: "/images/Team.jpg",
    teamCapacity: 3,
    currentMembers: 1,
    lookingFor: ["Strategy", "UI design"],
    techStack: ["Strategy", "ui design"],
    category: "Research",
    status: "Invite Only",
    university: "AlAzhar",
    mentorName: "Mentor Name",
    supervisorName: "Dr Name",
    postDate: "12 . dec . 2025",
    members: MOCK_MEMBERS.slice(0, 1),
  },
  {
    id: 8,
    name: "Project Name",
    description: SHARED_DESCRIPTION,
    fullDescription: FULL_DESCRIPTION,
    image: "/images/Team.jpg",
    teamCapacity: 5,
    currentMembers: 4,
    lookingFor: ["UI design"],
    techStack: ["ui design"],
    category: "Networking",
    status: "Hiring",
    university: "AlAzhar",
    mentorName: "Mentor Name",
    supervisorName: "Dr Name",
    postDate: "15 . dec . 2025",
    members: MOCK_MEMBERS,
  },
  {
    id: 9,
    name: "Project Name",
    description: SHARED_DESCRIPTION,
    fullDescription: FULL_DESCRIPTION,
    image: "/images/Team.jpg",
    teamCapacity: 4,
    currentMembers: 3,
    lookingFor: ["UI design", "Strategy", "UI design"],
    techStack: ["ui design", "Strategy", "ui design"],
    category: "Software",
    status: "Hiring",
    university: "AlAzhar",
    mentorName: "Mentor Name",
    supervisorName: "Dr Name",
    postDate: "18 . dec . 2025",
    members: MOCK_MEMBERS,
  },
];

export const FIND_TEAM_SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "best_match", label: "Best Match" },
];

export const FIND_TEAM_CATEGORY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "Software", label: "Software" },
  { value: "Design", label: "Design" },
  { value: "AI / ML", label: "AI / ML" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Data Science", label: "Data Science" },
  { value: "Networking", label: "Networking" },
  { value: "Mobile", label: "Mobile" },
  { value: "Research", label: "Research" },
];

export const FIND_TEAM_ROLE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "UI design", label: "UI design" },
  { value: "Strategy", label: "Strategy" },
  { value: "Backend", label: "Backend" },
  { value: "Frontend", label: "Frontend" },
  { value: "Mobile Dev", label: "Mobile Dev" },
  { value: "Data Analysis", label: "Data Analysis" },
];

export const FIND_TEAM_STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "Hiring", label: "Hiring" },
  { value: "Full", label: "Full" },
  { value: "Invite Only", label: "Invite Only" },
];
