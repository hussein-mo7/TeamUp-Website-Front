import axios from "axios";

type ApiErrorBody = {
  message?: string;
};

export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage: string,
) => {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    const responseMessage = error.response?.data?.message;
    if (responseMessage && responseMessage.trim().length > 0) {
      return responseMessage;
    }
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallbackMessage;
};