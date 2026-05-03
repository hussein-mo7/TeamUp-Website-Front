type JwtPayloadRecord = Record<string, unknown>;

const decodeBase64Url = (value: string) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = base64.length % 4;

  if (padding === 0) return base64;

  return base64.padEnd(base64.length + (4 - padding), "=");
};

export const decodeJwtPayload = <T extends JwtPayloadRecord>(token: string): T | null => {
  try {
    const payloadPart = token.split(".")[1];

    if (!payloadPart) return null;

    return JSON.parse(atob(decodeBase64Url(payloadPart))) as T;
  } catch {
    return null;
  }
};
