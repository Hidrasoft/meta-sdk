import { UnauthorizedError } from './UnauthorizedError';
import { RateLimitExceededError } from './RateLimitExceededError';
import { InternalServerError } from './InternalServerError';
import { GenericError } from './GenericError';

/**
 * MetaErrorFactory class responsible for generating and throwing specific errors based on the HTTP status code.
 */
export class MetaErrorFactory {
  /**
   * Handles HTTP errors and throws the appropriate exception.
   * @param statusCode - The HTTP status code from the API response.
   * @param errorMessage - Optional error message for further details.
   * @throws Throws an error corresponding to the provided status code.
   */
  public static throwRequestErrorAPI(statusCode: number, errorMessage?: string): void {
    switch (statusCode) {
      case 401:
        throw new UnauthorizedError(errorMessage);
      case 429:
        throw new RateLimitExceededError(errorMessage);
      case 500:
        throw new InternalServerError(errorMessage);
      default:
        throw new GenericError(errorMessage);
    }
  }
}
