import { BaseTokenHandler } from './BaseTokenHandler';
import { OAuthBodyResponse } from '../types';

/**
 * Handles system user access tokens for Meta API.
 */
export class SystemUserAccessTokenHandler extends BaseTokenHandler {

  public async fetchToken(params: { systemUserId: string; appSecret: string }): Promise<void> {

    const response = await this.apiClient.get(`${params.systemUserId}/access_tokens`, {
      appsecret_proof: params.appSecret, // App secret proof for enhanced security
      access_token: process.env.CLIENT_APP_TOKEN,
    });

    const data: OAuthBodyResponse | any = response.data;

    if (!data || data.length === 0) {
      throw new Error('No system user tokens found.');
    }

    this.token = data[0].access_token;
    this.expiry = new Date(Date.now() + (data[0].expires_in || 0) * 1000);
  }

}
