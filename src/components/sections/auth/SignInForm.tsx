"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, PasswordInput } from "@/components/ui/forms";
import { Heading } from "@/components/ui/typography";
import AuthSocialActions from "./AuthSocialActions";
import AuthSwitchPrompt from "./AuthSwitchPrompt";
import AuthErrorBanner from "./AuthErrorBanner";
import { useLogin } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/apiError";

interface SignInFormProps {
  onSwitchToSignUp?: () => void;
  onUniversityClick?: () => void;
  onForgotPasswordClick?: () => void;
}

const SignInForm = ({
  onSwitchToSignUp,
  onUniversityClick,
  onForgotPasswordClick,
}: SignInFormProps) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const loginMutation = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await loginMutation.mutateAsync({
        email: form.email.trim(),
        password: form.password,
      });
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Failed to log in."));
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="mb-5 md:mb-10">
          <AuthErrorBanner
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        </div>
      )}

      <Heading
        level="h3"
        className="font-semibold text-primary text-center mb-5 md:mb-14"
      >
        Login to Team up !
      </Heading>

      <div className="flex flex-col gap-5 mt-4">
        <Input
          id="signin-email"
          name="email"
          type="email"
          label="Email Address"
          value={form.email}
          onChange={handleChange}
          placeholder="enter your email"
        />
        <div className="flex flex-col gap-1">
          <PasswordInput
            id="signin-password"
            name="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            placeholder="enter Password"
          />
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={onForgotPasswordClick}
              className="font-primary text-xs text-red-400 hover:text-red-500 transition-colors duration-200"
              aria-label="Forgot password"
            >
              Forget password?
            </button>
          </div>
        </div>
      </div>

      <AuthSocialActions
        submitLabel={loginMutation.isPending ? "Logging in..." : "Login"}
        onSubmit={handleSubmit}
        submitDisabled={loginMutation.isPending}
        showUniversityButton
        onUniversityClick={onUniversityClick}
        containerClassName="mt-10"
        socialGridClassName="mt-5"
      />

      <AuthSwitchPrompt
        promptText={"Don't have an account?"}
        actionText="Sign UP"
        onAction={onSwitchToSignUp}
      />
    </>
  );
};

export default SignInForm;
