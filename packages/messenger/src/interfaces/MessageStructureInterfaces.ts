/**
 * Interfaces representing webhook events messages received from Messenger platform.
 * Full documentation available at https://developers.facebook.com/docs/messenger-platform/reference/webhook-events
 */
import { ATTACHMENT_TYPE, REFERER_SOURCE } from '../enums';

export interface MessengerMessagePayload {
  object: string;
  entry: MessengerMessagePayloadEntry[];
}

export interface MessengerMessagePayloadEntry {
  id: string;
  time: number;
  messaging: MessengerMessagePayloadMessagingEntry[];
}

/**
 * Encompassing payload containing all variations of payload types. Only one of optional types present in every payload.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface MessengerMessagePayloadMessagingEntry {
  sender: {
    id: string,
  };
  recipient: {
    id: string,
  };
  timestamp: number;
  message?: MessengerMessagePayloadMessageEntry;
  account_linking?: MessengerMessagePayloadAccountLinking;
  checkout_update?: MessengerMessagePayloadCheckoutUpdate;
  delivery?: MessengerMessagePayloadDelivery;
  game_play?: MessengerMessagePayloadGame;
  pass_thread_control?: MessengerMessageHandover;
  optin?: MessengerMessageOptin;
  payment?: MessengerMessagePayloadPayment;
  'policy-enforcement'?: MessengerMessagePayloadPolicyEnforcement;
  postback?: MessengerMessagePayloadPostback;
  payment_pre_checkout?: MessengerMessagePayloadPreCheckout;
  read?: MessengerMessagePayloadRead;
  referral?: MessengerMessagePayloadReferral;
  standby?: MessengerMessagePayloadStandbyChannel[];
}

/**
 * Represents a message incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface MessengerMessagePayloadMessageEntry {
  mid: string;
  is_echo?: boolean;
  app_id?: number;
  metadata?: string;
  seq?: string;
  text?: string;
  attachments?: (MessengerMessagePayloadAttachments | MessengerMessagePayloadAttachmentsFallback)[];
  quick_reply?: {
    payload: string,
  };
}

/**
 * Represents a message multimedia attachment incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface MessengerMessagePayloadAttachments {
  type: ATTACHMENT_TYPE;
  payload: MessengerMessagePayloadAttachmentMultimedia | MessengerMessagePayloadAttachmentLocation;
}

/**
 * Represents a message multimedia attachment payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface MessengerMessagePayloadAttachmentMultimedia {
  url: string;
}

/**
 * Represents a message geolocation attachment payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface MessengerMessagePayloadAttachmentLocation {
  'coordinates.lat': string;
  'coordinates.long': string;
}

/**
 * Represents a message fallback attachment payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface MessengerMessagePayloadAttachmentsFallback {
  type: ATTACHMENT_TYPE;
  payload: null;
  url: string;
  title: string;
}

/**
 * Represents a postback payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 */
export interface MessengerMessagePayloadPostback {
  title: string;
  payload: string;
  referral: MessengerMessagePayloadReferral;
}

/**
 * Represents a postback payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/referral
 */
export interface MessengerMessagePayloadReferral {
  ref?: string;
  source: REFERER_SOURCE;
  type: string;
  ad_id?: string;
  referer_uri?: string;
}

/**
 * Represents a read payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
 */
export interface MessengerMessagePayloadRead {
  watermark: string;
  seq: string;
}

/**
 * Represents a delivery payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
 */
export interface MessengerMessagePayloadDelivery {
  mids: string[];
  watermark: number;
  seq: number;
}

/**
 * Represents a standby channel payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/standby
 */
export interface MessengerMessagePayloadStandbyChannel {
  sender: {
    id: string,
  };
  recipient: {
    id: string,
  };
  message?: MessengerMessagePayloadMessageEntry;
  postback?: MessengerMessagePayloadPostback;
  read?: MessengerMessagePayloadRead;
  delivery?: MessengerMessagePayloadDelivery;
}

/**
 * Represents a payment pre-checkout channel payload incoming from Messenger.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_pre_checkouts
 */
export interface MessengerMessagePayloadPreCheckout {
  payload: string;
  amount: {
    currency: string,
    amount: string,
  };
  requested_user_info: {
    shipping_address: MessengerMessagePayloadPaymentShipping
    contact_name: string,
  };
}

/**
 * Represents a payment shipping info sub-payload incoming from Messenger.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_pre_checkouts
 */
export interface MessengerMessagePayloadPaymentShipping {
  name?: string;
  id?: string;
  street_1: string;
  street_2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

/**
 * Represents an account linking payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/account-linking
 */
export interface MessengerMessagePayloadAccountLinking {
  status: string;
  authorization_code: string;
}

/**
 * Represents a payment checkout update payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/checkout-update
 */
export interface MessengerMessagePayloadCheckoutUpdate {
  payload: string;
  shipping_address: MessengerMessagePayloadPaymentShipping;
}

/**
 * Represents a game play payload incoming from Messenger.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_game_plays/
 */
export interface MessengerMessagePayloadGame {
  game_id: string;
  player_id: string;
  context_type: string;
  context_id: string;
  score: number;
  payload: string;
}

/**
 * Represents a handover payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.Messenger.com/docs/messenger-platform/reference/webhook-events/messaging_handovers
 */
export interface MessengerMessageHandover {
  new_owner_app_id: string;
  metadata: string;
}

/**
 * Represents a optin payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_optins
 */
export interface MessengerMessageOptin {
  ref: string;
  user_ref: string;
}

/**
 * Represents a policy enforcement payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/policy-enforcement
 */
export interface MessengerMessagePayloadPolicyEnforcement {
  action: string;
  reason: string;
}

/**
 * Represents a payment payload incoming from Messenger.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/payment
 */
export interface MessengerMessagePayloadPayment {
  requested_user_info: {
    shipping_address: MessengerMessagePayloadPaymentShipping
    contact_name: string,
    contact_email: string,
    contact_phone: string,
  };
  payment_credential: {
    provider_type: string,
    charge_id: string,
    fb_payment_id: string
    tokenized_card?: string,
    tokenized_cvv?: string,
    token_expiry_month?: string,
    token_expiry_year?: string,
  };
  amount: {
    currency: string,
    amount: string,
  };
  shipping_option_id: string;
}