import { useMutation, useQuery } from "@tanstack/react-query";
import { getStoredAuthToken } from "@/lib/axios";
import { decodeJwtPayload } from "@/lib/jwt";
import { authService } from "@/services/auth.service";
import type {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  ResetPasswordPayload,
  RevokeTokensPayload,
  SignUpPayload,
  TokenPayload,
} from "@/types/auth";

export const authQueryKeys = {
  session: (token?: string) => ["auth", "session", token ?? "anonymous"] as const,
};

export const useLogin = () =>
  useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
  });

export const useSignUp = () =>
  useMutation({
    mutationFn: (payload: SignUpPayload) => authService.signUp(payload),
  });

export const useVerifyEmail = () =>
  useMutation({
    mutationFn: (payload: TokenPayload) => authService.verifyEmail(payload),
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      authService.forgotPassword(payload),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      authService.resetPassword(payload),
  });

export const useChangePassword = () =>
  useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      authService.changePassword(payload),
  });

export const useRefreshToken = () =>
  useMutation({
    mutationFn: (payload?: TokenPayload) => authService.refreshToken(payload),
  });

export const useRevokeTokens = () =>
  useMutation({
    mutationFn: (payload: RevokeTokensPayload) =>
      authService.revokeTokens(payload),
  });

export const useLogout = () => {
  const revokeTokensMutation = useRevokeTokens();

  const logout = async () => {
    const token = getStoredAuthToken();
    const payload = token ? decodeJwtPayload<{ userId?: string }>(token) : null;

    if (!payload?.userId) {
      authService.clearToken();
      return;
    }

    try {
      await revokeTokensMutation.mutateAsync({ userId: payload.userId });
    } catch (error) {
      authService.clearToken();
      throw error;
    }
  };

  return {
    logout,
    ...revokeTokensMutation,
  };
};

export const useValidateToken = (enabled = false) => {
  const token = getStoredAuthToken();

  return useQuery({
    queryKey: authQueryKeys.session(token ?? undefined),
    queryFn: () => authService.validateToken(),
    enabled: enabled && Boolean(token),
  });
};