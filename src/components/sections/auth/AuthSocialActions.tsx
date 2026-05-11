"use client";

import { OrDivider, SocialButton, SubmitButton } from "@/components/ui/forms";
import UniversityButton from "./UniversityButton";

interface AuthSocialActionsProps {
  submitLabel: string;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  submitDisabled?: boolean;
  showUniversityButton?: boolean;
  onUniversityClick?: () => void;
  onGoogleClick?: () => void;
  onLinkedInClick?: () => void;
  containerClassName?: string;
  socialGridClassName?: string;
}

const AuthSocialActions = ({
  submitLabel,
  onSubmit,
  submitDisabled = false,
  showUniversityButton = false,
  onUniversityClick,
  onGoogleClick,
  onLinkedInClick,
  containerClassName = "mt-5",
  socialGridClassName = "",
}: AuthSocialActionsProps) => {
  return (
    <div className={`flex flex-col gap-4 ${containerClassName}`.trim()}>
      <SubmitButton label={submitLabel} onClick={onSubmit} disabled={submitDisabled} />

      {showUniversityButton && (
        <>
          <OrDivider />
          <UniversityButton onClick={onUniversityClick} />
          <div
            className={`grid grid-cols-2 gap-3 ${socialGridClassName}`.trim()}
          >
            <SocialButton label="Google" onClick={onGoogleClick} />
            <SocialButton label="LinkedIn" onClick={onLinkedInClick} />
          </div>
        </>
      )}
    </div>
  );
};

export default AuthSocialActions;
