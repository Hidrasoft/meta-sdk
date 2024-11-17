/**
 * Custom error for internal server error (HTTP 500).
 */
export class InternalServerError extends Error {
  constructor(message: string = 'Internal server error. Please try again later.') {
    super(message);
    this.name = 'InternalServerError';  // Set the error name
  }
}
