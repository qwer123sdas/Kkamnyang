import type { ApiErrorCode } from "../constants/api";

export type ApiSuccessResponse<TData> = {
  success: true;
  data: TData;
  message: null;
};

export type ApiErrorResponse = {
  success: false;
  data: null;
  message: string;
  error_code: ApiErrorCode;
};

export type ApiResponse<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;

export type PaginatedResponse<TItem> = {
  items: TItem[];
  page: number;
  size: number;
  has_next: boolean;
};
