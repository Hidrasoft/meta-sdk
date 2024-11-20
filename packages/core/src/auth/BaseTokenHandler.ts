import { MetaApiClient } from '../client/MetaApiClient';

/**
 * Base class for managing Meta API tokens.
 */
export abstract class BaseTokenHandler {
  protected token: string | null = null;
  protected expiry: Date | null = null;

  constructor(protected apiClient: MetaApiClient) {}

  /**
   * Abstract method for fetching the token.
   */
  public abstract fetchToken(params: Record<string, any>): Promise<void>;

  /**
   * Returns the current token, renewing it if necessary.
   */
  public async getAccessToken(): Promise<string> {
    if (!this.token || this.isExpired()) {
      await this.fetchToken({});
    }
    return this.token!;
  }

  /**
   * Checks if the token is expired.
   */
  protected isExpired(): boolean {
    return !this.expiry || new Date() >= this.expiry;
  }
}
