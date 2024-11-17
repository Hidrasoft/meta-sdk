/**
 * Custom error for access token no set config
 */
export class AccessTokenNotSetError extends Error {
  constructor(message: string = 'Access token API not set. Please set a valid value.') {
    super(message);
    this.name = 'AccessTokenNotSetError';  // Set the error name
  }
}