"use client";

import { Heading } from "@/components/ui/typography";

interface UserDetailsAcademicCardProps {
  university: string;
  major: string;
  joinedTeam: string;
  rightLabel: string;
  rightContent: React.ReactNode;
  footer?: React.ReactNode;
}

const UserDetailsAcademicCard = ({
  university,
  major,
  joinedTeam,
  rightLabel,
  rightContent,
  footer,
}: UserDetailsAcademicCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <Heading level="h4" className="font-semibold text-content">
        Academic Profile
      </Heading>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <div>
            <p className="font-primary text-sm text-slate-500">University</p>
            <p className="mt-1 font-primary text-sm font-semibold text-content">{university}</p>
          </div>
          <div>
            <p className="font-primary text-sm text-slate-500">major</p>
            <p className="mt-1 font-primary text-sm font-semibold text-content">{major}</p>
          </div>
          <div>
            <p className="font-primary text-sm text-slate-500">Joined Team</p>
            <p className="mt-1 font-primary text-sm text-primary">{joinedTeam}</p>
          </div>
        </div>

        <div>
          <p className="font-primary text-sm text-slate-500">{rightLabel}</p>
          <div className="mt-3">{rightContent}</div>
          {footer ? <div className="mt-6">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsAcademicCard;