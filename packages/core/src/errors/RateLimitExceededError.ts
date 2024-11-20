/**
 * Custom error for rate limit exceeded (HTTP 429).
 */
export class RateLimitExceededError extends Error {
  constructor(message: string = 'Rate limit exceeded. Please try again later.') {
    super(message);
    this.name = 'RateLimitExceededError';  // Set the error name
  }
}
