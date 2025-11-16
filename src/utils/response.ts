import type { ApiResponse, PaginationMeta } from "../types/index";

export const ResponseHTTP = {
  ok<T>(data: T, message = "Success", meta?: PaginationMeta): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
      meta,
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
