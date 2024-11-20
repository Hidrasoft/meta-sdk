/**
 * Custom error for unauthorized access (HTTP 401).
 */
export class UnauthorizedError extends Error {
  constructor(message: string = 'Unauthorized: Invalid or expired access token.') {
    super(message);
    this.name = 'UnauthorizedError';  // Set the error name
  }
}
