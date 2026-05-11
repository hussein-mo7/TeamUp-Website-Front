interface MentorAcademicCardProps {
  title: string;
}

const MentorAcademicCard = ({ title }: MentorAcademicCardProps) => {
  const titleLabel = title.trim() || "Academic title not added yet.";

  return (
    <div className="px-4 py-4 sm:px-6 sm:py-5 border border-gray-100 rounded-lg my-4">
      <p className="mb-3 font-primary font-semibold text-content">Academic title</p>
      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 sm:px-4">
        <p className="break-words font-primary text-sm text-content-light">{titleLabel}</p>
      </div>
    </div>
  );
};

export default MentorAcademicCard;
