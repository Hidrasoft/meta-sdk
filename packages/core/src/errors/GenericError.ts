/**
 * Custom error for generic errors.
 */
export class GenericError extends Error {
  constructor(message: string = 'An unknown error occurred.') {
    super(message);
    this.name = 'GenericError';  // Set the error name
  }
}
