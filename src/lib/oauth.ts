export type OAuthProvider = "google" | "linkedin";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api/v1";

export const syncOAuthSession = async () => {
  const response = await fetch("/api/auth/session", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { success?: boolean; token?: string };
  return data.token ?? null;
};

export const startOAuthLogin = (provider: OAuthProvider) => {
  if (typeof window === "undefined") {
    return;
  }

  window.location.href = `${API_BASE_URL}/auth/${provider}`;
};
