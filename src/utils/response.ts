import type { ApiResponse } from "../types/index.ts";

export const ResponseHTTP = {
  ok<T>(data: T, message = "Success"): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  },

  created<T>(data: T, message = "Created"): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  },

  // Untuk kasus tanpa data
  success(message = "Success"): ApiResponse<null> {
    return {
      success: true,
      message,
    };
  },

  // Untuk error format
  error(message = "Error", status = 500): ApiResponse<null> {
    return {
      success: false,
      message,
    };
  },
};
