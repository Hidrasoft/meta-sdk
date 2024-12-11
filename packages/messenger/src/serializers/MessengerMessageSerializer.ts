import { MessengerMessagePayload, MessengerMessagePayloadMessageEntry } from '../interfaces/MessageStructureInterfaces';

export class MessengerMessageSerializer {
  /**
   * Parse messenger message to platform received
   * @param {MessengerMessagePayload} payload data message serializer
   */
  public static parse(payload: MessengerMessagePayload): MessengerMessagePayloadMessageEntry[] {
    if(this.isMessagePayload(payload)) {
      return this.flattenPayload(payload.entry);
    }

    throw new Error('Invalid/Unknown Facebook Message Event.');
  }

  /**
   * Validate message payload serializer
   * @param {MessengerMessagePayload} payload data message serializer
   * @private
   */
  private static isMessagePayload(payload: MessengerMessagePayload) {
    return payload.hasOwnProperty('object') && payload.object === 'page' && typeof payload.entry !== 'undefined';
  }

  /**
   * Flatten payload messenger message to serializer
   * @param {Array} payload data message serializer
   * @private
   */
  private static flattenPayload(payload: any[]): MessengerMessagePayloadMessageEntry[] {
    return payload.reduce((flat, toFlatten) => {

      return flat.concat(Array.isArray(toFlatten) ? MessengerMessageSerializer.flattenPayload(toFlatten) :
        Array.isArray(toFlatten.messaging) ? MessengerMessageSerializer.flattenPayload(toFlatten.messaging) : toFlatten);

    }, []);
  }
}