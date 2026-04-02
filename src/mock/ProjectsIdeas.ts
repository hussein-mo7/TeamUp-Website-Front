// ── Projects Ideas — mock data ───────────────────────────────────────────────

export type IdeaPrice = "free" | "paid";

export interface ProjectIdea {
  id: number;
  name: string;
  description: string;
  price: IdeaPrice;
  priceAmount?: number; // e.g. 5 — only when price === "paid"
  postedBy: string;
  mentorAvatar: string;
  postDate: string;
  category: string;
  difficultyLevel: string;
  timeFrame: string;
  techStack: string[];
  isSaved: boolean;
  image: string; // Project image/thumbnail
}

const DESC =
  "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.";

export const PROJECTS_IDEAS: ProjectIdea[] = [
  {
    id: 1,
    name: "Project Name",
    description: DESC,
    price: "free",
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Design",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: false,
    image: "/images/Team.jpg",
  },
  {
    id: 2,
    name: "Project Name",
    description: DESC,
    price: "paid",
    priceAmount: 5,
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Software",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: false,
    image: "/images/Team.jpg",
  },
  {
    id: 3,
    name: "Project Name",
    description: DESC,
    price: "free",
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "AI / ML",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: true,
    image: "/images/Team.jpg",
  },
  {
    id: 4,
    name: "Project Name",
    description: DESC,
    price: "free",
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Mobile",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: false,
    image: "/images/Team.jpg",
  },
  {
    id: 5,
    name: "Project Name",
    description: DESC,
    price: "paid",
    priceAmount: 5,
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Cybersecurity",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: false,
    image: "/images/Team.jpg",
  },
  {
    id: 6,
    name: "Project Name",
    description: DESC,
    price: "free",
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Data Science",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: true,
    image: "/images/Team.jpg",
  },
  {
    id: 7,
    name: "Project Name",
    description: DESC,
    price: "free",
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Research",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: false,
    image: "/images/Team.jpg",
  },
  {
    id: 8,
    name: "Project Name",
    description: DESC,
    price: "paid",
    priceAmount: 5,
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Networking",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: false,
    image: "/images/Team.jpg",
  },
  {
    id: 9,
    name: "Project Name",
    description: DESC,
    price: "free",
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Software",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: true,
    image: "/images/Team.jpg",
  },
];

export const IDEAS_SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "best_match", label: "Best Match" },
];

export const IDEAS_CATEGORY_OPTIONS = [
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

export const IDEAS_PRICE_OPTIONS = [
  { value: "", label: "All" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];
