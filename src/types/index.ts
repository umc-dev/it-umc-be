export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: PaginationMeta;
}

// export interface ApiResponseWithPaginationMeta<T> extends ApiResponse<T> {
//   meta: PaginationMeta;
// }
