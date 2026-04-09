interface UserDetailPillProps {
  children: React.ReactNode;
  tone?: "primary" | "success" | "warning";
}

const toneClasses: Record<NonNullable<UserDetailPillProps["tone"]>, string> = {
  primary: "bg-primary-light text-primary",
  success: "bg-emerald-100 text-emerald-500",
  warning: "bg-amber-100 text-amber-500",
};

const UserDetailPill = ({ children, tone = "primary" }: UserDetailPillProps) => {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 font-primary text-[11px] ${toneClasses[tone]}`}>
      {children}
    </span>
  );
};

export default UserDetailPill;
