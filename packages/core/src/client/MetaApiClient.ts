import { ApiClientConfig, ApiResponse } from '../types';
import { MetaErrorFactory } from '../errors/MetaErrorFactory';
import { HelperApiClient } from '../helpers/HelperApiClient';
import { HttpMethods } from '../enum';

/**
 * MetaApiClient class to interact with Meta APIs.
 * Handles authentication, HTTP requests, and error management.
 */
export class MetaApiClient {
  private accessToken: string;  // Access token used for authentication
  private readonly apiUrl: string;  // Base URL for Meta API
  private readonly apiVersion: string = 'v12.0';
  private readonly apiHost: string = "https://graph.facebook.com";
  private readonly config: ApiClientConfig;

  /**
   * Creates an instance of MetaApiClient with an access token.
   * @param accessToken - The access token used for authenticating API requests.
   */
  constructor(accessToken?: string, config?: ApiClientConfig) {
    this.config = HelperApiClient.setApiClientConfig(config);
    this.accessToken = HelperApiClient.setAccessToken(accessToken);
    this.apiUrl = `${this.apiHost}/${this.apiVersion}`;  // Meta Graph API base URL
  }

  /**
   * General method for making HTTP requests (GET, POST, PUT, DELETE).
   * @param method - The HTTP method (GET, POST, PUT, DELETE).
   * @param endpoint - The API endpoint to request.
   * @param params - Optional parameters to include in the request.
   * @returns A promise containing the API response data.
   */
  private async request<T>(method: string, endpoint: string, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
    let url = new URL(`${this.apiUrl}/${endpoint}`);
    params = {
      ...params,
      accessToken: this.accessToken,
    };

    url = HelperApiClient.setRequestParams(url, params, this.config);
    const response = await fetch(url.toString(), { method });  // Send the HTTP request

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      MetaErrorFactory.throwRequestErrorAPI(response.status, errorData.error?.message);
    }

    const data: T = await response.json();  // Parse the response JSON
    return { data };  // Return the data from the API
  }

  /**
   * Makes a GET request to the specified endpoint.
   * @param endpoint - The API endpoint to request.
   * @param params - Optional parameters to include in the request.
   * @returns A promise containing the API response data.
   */
  public get<T>(endpoint: string, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
    return this.request(HttpMethods.GET, endpoint, params);
  }

  /**
   * Makes a POST request to the specified endpoint.
   * @param endpoint - The API endpoint to request.
   * @param params - Optional parameters to include in the request.
   * @returns A promise containing the API response data.
   */
  public post<T>(endpoint: string, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
    return this.request(HttpMethods.POST, endpoint, params);
  }

  /**
   * Makes a PUT request to the specified endpoint.
   * @param endpoint - The API endpoint to request.
   * @param params - Optional parameters to include in the request.
   * @returns A promise containing the API response data.
   */
  public put<T>(endpoint: string, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
    return this.request(HttpMethods.PUT, endpoint, params);
  }

  /**
   * Makes a DELETE request to the specified endpoint.
   * @param endpoint - The API endpoint to request.
   * @param params - Optional parameters to include in the request.
   * @returns A promise containing the API response data.
   */
  public delete<T>(endpoint: string, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
    return this.request(HttpMethods.DELETE, endpoint, params);
  }

  /**
   * Refreshes the access token.
   * @returns A promise containing the new access token.
   * @throws Throws an error if token refresh fails.
   */
  public async refreshToken(): Promise<string> {
    // Example URL for token refresh
    const url = `${this.apiUrl}/oauth/access_token?grant_type=refresh_token&refresh_token=${this.accessToken}`;
    const response = await fetch(url);  // Send the refresh token request
    const data = await response.json();  // Parse the response JSON

    if (!response.ok || !data.access_token) {
      throw new Error('Failed to refresh access token');  // Error if no new token is returned
    }

    this.accessToken = data.access_token;  // Update the access token
    return this.accessToken;  // Return the new token
  }
}
