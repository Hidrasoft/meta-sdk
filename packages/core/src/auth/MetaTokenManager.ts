import { MetaApiClient } from '../client/MetaApiClient';
import { AppAccessTokenHandler } from './AppAccessTokenHandler';
import { ClientAccessTokenHandler } from './ClientAccessTokenHandler';
import { PageAccessTokenHandler } from './PageAccessTokenHandler';
import { SystemUserAccessTokenHandler } from './SystemUserAccessTokenHandler';
import { UserAccessTokenHandler } from './UserAccessTokenHandler';

/**
 * Centralized manager for all Meta API token types.
 * This class provides a unified interface for handling different types of tokens
 * required to interact with various Meta APIs.
 */
export class MetaTokenManager {
  private appTokenHandler: AppAccessTokenHandler; // Handles App access tokens
  private clientTokenHandler: ClientAccessTokenHandler; // Handles Client access tokens
  private pageTokenHandler: PageAccessTokenHandler; // Handles Page access tokens
  private systemUserTokenHandler: SystemUserAccessTokenHandler; // Handles System User access tokens
  private userTokenHandler: UserAccessTokenHandler; // Handles User access tokens

  /**
   * Initializes the MetaTokenManager with the necessary API client.
   * @param apiClient - The MetaApiClient instance for making API requests.
   */
  constructor(apiClient: MetaApiClient) {
    this.appTokenHandler = new AppAccessTokenHandler(apiClient);
    this.clientTokenHandler = new ClientAccessTokenHandler(apiClient);
    this.pageTokenHandler = new PageAccessTokenHandler(apiClient);
    this.systemUserTokenHandler = new SystemUserAccessTokenHandler(apiClient);
    this.userTokenHandler = new UserAccessTokenHandler(apiClient);
  }

  /**
   * Retrieves an app-level access token.
   * @returns A promise resolving to the app access token.
   */
  public async getAppToken(): Promise<string> {
    return this.appTokenHandler.getAccessToken();
  }

  /**
   * Retrieves a client-level access token.
   * @param clientToken - The client token to validate and fetch.
   * @returns A promise resolving to the validated client access token.
   */
  public async getClientToken(clientToken: string): Promise<string> {
    await this.clientTokenHandler.fetchToken({ clientToken });
    return this.clientTokenHandler.getAccessToken();
  }

  /**
   * Retrieves a page-level access token.
   * @param userAccessToken - A user access token associated with the page.
   * @returns A promise resolving to the page access token.
   */
  public async getPageToken(userAccessToken: string): Promise<string> {
    await this.pageTokenHandler.fetchToken({ userAccessToken });
    return this.pageTokenHandler.getAccessToken();
  }

  /**
   * Retrieves a system user access token.
   * @param systemUserId - The system user ID to fetch the token for.
   * @param appSecret - The application secret for secure token access.
   * @returns A promise resolving to the system user access token.
   */
  public async getSystemUserToken(systemUserId: string, appSecret: string): Promise<string> {
    await this.systemUserTokenHandler.fetchToken({ systemUserId, appSecret });
    return this.systemUserTokenHandler.getAccessToken();
  }

  /**
   * Retrieves a user-level access token.
   * @param code - The authorization code obtained during the OAuth process.
   * @param redirectUri - The redirect URI associated with the OAuth request.
   * @returns A promise resolving to the user access token.
   */
  public async getUserToken(code: string, redirectUri: string): Promise<string> {
    await this.userTokenHandler.fetchToken({ code, redirectUri });
    return this.userTokenHandler.getAccessToken();
  }
}
