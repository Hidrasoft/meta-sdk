import { BaseTokenHandler } from './BaseTokenHandler';
import { OAuthBodyResponse } from '../types';

/**
 * Handles client access tokens for Meta API.
 */
export class ClientAccessTokenHandler extends BaseTokenHandler {

  public async fetchToken(params: { clientToken: string }): Promise<void> {
    // Validate token using the debug endpoint
    const response = await this.apiClient.get('debug_token', {
      input_token: params.clientToken,
      access_token: process.env.CLIENT_APP_TOKEN, // App token required for validation
    });

    const data: OAuthBodyResponse | any = response.data;

    if (data.is_valid) {
      throw new Error('Invalid client token.');
    }

    this.token = params.clientToken;
    this.expiry = data.expires_at
      ? new Date(data.expires_at * 1000)
      : null;
  }

}