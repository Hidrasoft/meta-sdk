export interface ApiResponse<T> {
  data: T;  // Data returned from the API
  error?: string;  // Optional error message
}

export interface ApiClientConfig {
  auth: ApiClientAuthOptions
}

export type ApiClientAuthOptions = {
  useAccessToken?: boolean;
}