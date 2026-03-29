interface ProjectSettingsSectionPlaceholderProps {
  title: string;
  description?: string;
}

const ProjectSettingsSectionPlaceholder = ({
  title,
  description = "This section will be available in a future update.",
}: ProjectSettingsSectionPlaceholderProps) => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h3 className="font-primary text-lg font-semibold text-content">{title}</h3>
      <p className="mt-2 font-primary text-sm text-content-light">{description}</p>
    </div>
  );
};

export default ProjectSettingsSectionPlaceholder;
