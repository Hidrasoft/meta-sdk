import { BaseTokenHandler } from './BaseTokenHandler';
import { OAuthBodyResponse } from '../types';

/**
 * Token manager for application access tokens.
 */
export class AppAccessTokenHandler extends BaseTokenHandler {
  public async fetchToken(): Promise<void> {

    const response = await this.apiClient.get('oauth/access_token', {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'client_credentials',
    });

    const data: OAuthBodyResponse | any = response.data;

    this.token = data?.access_token;
    this.expiry = new Date(Date.now() + (data?.expires_in || 0) * 1000);
  }
}
