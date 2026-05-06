export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
};
