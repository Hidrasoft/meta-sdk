import { BaseTokenHandler } from './BaseTokenHandler';
import { OAuthBodyResponse } from '../types';

/**
 * Token manager for user access tokens.
 */
export class UserAccessTokenHandler extends BaseTokenHandler {

  public async fetchToken(params: { code: string; redirectUri: string }): Promise<void> {
    const response = await this.apiClient.get('oauth/access_token', {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: params.redirectUri,
      code: params.code,
    });

    const data: OAuthBodyResponse | any = response.data;

    this.token = data?.access_token;
    this.expiry = new Date(Date.now() + (data?.expires_in || 0) * 1000);
  }

}
