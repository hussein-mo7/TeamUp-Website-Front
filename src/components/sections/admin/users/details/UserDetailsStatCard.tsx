"use client";

import Image from "next/image";

interface UserDetailsStatCardProps {
  iconSrc: string;
  iconAlt: string;
  value: string;
  label: string;
  accentClassName: string;
}

const UserDetailsStatCard = ({
  iconSrc,
  iconAlt,
  value,
  label,
  accentClassName,
}: UserDetailsStatCardProps) => {
  return (
    <div className="rounded-xl py-3 text-center border border-gray-200">
      <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${accentClassName}`}>
        <Image src={iconSrc} alt={iconAlt} width={30} height={30} unoptimized />
      </div>
      <p className="mt-2 font-primary text-[11px] text-slate-400">{label}</p>
      <p className="font-primary text-sm font-medium text-slate-500">{value}</p>
    </div>
  );
};

export default UserDetailsStatCard;