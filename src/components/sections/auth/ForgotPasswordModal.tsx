"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, MailCheck } from "lucide-react";
import { Modal } from "@/components/ui/modals";
import { EmailStep } from "./forgotPassword";
import { useForgotPassword } from "@/hooks/useAuth";
import { Heading } from "@/components/ui/typography";
import { getApiErrorMessage } from "@/lib/apiError";

type ForgotStep = "email" | "sent";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: ForgotStep;
  initialEmail?: string;
}

const ForgotPasswordModal = ({
  isOpen,
  onClose,
  initialStep = "email",
  initialEmail = "",
}: ForgotPasswordModalProps) => {
  const [step, setStep] = useState<ForgotStep>(initialStep);
  const [email, setEmail] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const forgotPasswordMutation = useForgotPassword();

  useEffect(() => {
    if (!isOpen) return;
    setStep(initialStep);
    setEmail(initialEmail);
    setErrorMessage("");
  }, [isOpen, initialStep, initialEmail]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(initialStep);
      setEmail(initialEmail);
      setIsLoading(false);
      setErrorMessage("");
    }, 300);
  };

  const handleSendCode = async (emailInput: string) => {
    setIsLoading(true);
    setEmail(emailInput);
    setErrorMessage("");

    try {
      await forgotPasswordMutation.mutateAsync({ email: emailInput });
      setIsLoading(false);
      setStep("sent");
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        getApiErrorMessage(error, "Failed to send reset link."),
      );
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setErrorMessage("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[520px] p-6 md:p-8"
    >
      {step === "email" && (
        <EmailStep
          onSendCode={handleSendCode}
          onBack={handleClose}
          isLoading={isLoading}
          initialEmail={email}
        />
      )}

      {step === "sent" && (
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center">
            <MailCheck size={26} className="text-primary" aria-hidden="true" />
          </div>

          <Heading level="h4" className="text-primary font-semibold">
            Check your email
          </Heading>

          <p className="font-primary text-sm text-content leading-relaxed max-w-[340px]">
            If an account exists for <span className="font-semibold">{email}</span>, we sent a reset link.
            Open that link to choose a new password.
          </p>

          <button
            type="button"
            onClick={handleBackToEmail}
            className="flex items-center gap-2 font-primary text-xs text-content-light hover:text-primary transition-colors duration-150"
          >
            <ChevronLeft size={14} aria-hidden="true" className="text-content-light" />
            <span>Use another email</span>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="w-full h-11 bg-primary text-white text-sm font-semibold font-primary rounded-xl transition-all duration-200 hover:bg-primary-dark"
          >
            Close
          </button>

          {errorMessage && (
            <p className="text-sm text-red-500 font-primary">{errorMessage}</p>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
