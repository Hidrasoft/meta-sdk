import { AccessTokenNotSetError } from '../errors/AccessTokenNotSetError';
import { ApiClientConfig } from '../types';

/**
 * HelperApiClient class to provider assets MetaApiClient.
 * Handles manage token, format data, and error management.
 */
export class HelperApiClient {
  /**
   * Method to set access config to request Meta API
   * @param {string} tokenProvider - Optional parameters to set access token
   */
  static setAccessToken(tokenProvider?: string): string {
    const accessToken: string = tokenProvider || process.env.META_ACCESS_TOKEN || "";

    if(!accessToken) {
      throw new AccessTokenNotSetError();
    }

    return accessToken;
  }

  /**
   * Method to set api client config
   * @param {ApiClientConfig} config object config api client
   */
  static setApiClientConfig(config: ApiClientConfig | undefined) {
    return config || {
      auth: {
        useAccessToken: true,
        clientId: process.env.META_APP_ID,
        clientSecret: process.env.META_APP_SECRET,
      }
    };
  }

  /**
   * Method to set request params to request Meta API
   * @param {URL} url object URL to url request service
   * @param {Record<string, any>} params object request params meta API
   * @param {ApiClientConfig} config object config set params
   */
  static setRequestParams(url: URL, params: Record<string, any> = {}, config: ApiClientConfig): URL {
    if(config.auth.useAccessToken) {
      url.searchParams.set('access_token', params?.accessToken);
    }

    Object.keys(params).forEach(key => url.searchParams.set(key, params[key]));
    return url;
  }
}