export interface ApiResponse<T> {
  data: T;  // Data returned from the API
  error?: string;  // Optional error message
}

export interface ApiClientConfig {
  auth: ApiClientAuthOptions
}

export type ApiClientAuthOptions = {
  useAccessToken?: boolean;
  clientId?: string;
  clientSecret?: string;
  grantType?: string;
}

export type OAuthBodyResponse = {
  access_token: string;
  token_type: string;
}