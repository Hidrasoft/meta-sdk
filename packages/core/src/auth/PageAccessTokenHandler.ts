import { BaseTokenHandler } from './BaseTokenHandler';
import { OAuthBodyResponse } from '../types';

/**
 * Handles page access tokens for Meta API.
 */
export class PageAccessTokenHandler extends BaseTokenHandler {
  public async fetchToken(params: { userAccessToken: string }): Promise<void> {
    const response = await this.apiClient.get('me/accounts', {
      access_token: params.userAccessToken,
    });

    const data: OAuthBodyResponse | any = response.data;

    if (!data || data.length === 0) {
      throw new Error('No pages found for the provided user access token.');
    }

    // Example: Retrieve the first page's access token
    const page = data[0];
    this.token = page.access_token;
    this.expiry = null; // Page tokens often don't expire
  }
}
