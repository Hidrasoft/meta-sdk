import { ATTACHMENT_TYPE } from '../enums';

export interface ClientMessage {
  message?: MessagePayload;
  sender_action?: string;
}

export interface AttachmentPayload {
  type: ATTACHMENT_TYPE;
  payload: Object;
}

export interface MessagePayload {
  text?: string;
  // quick_replies?: IQuickReply[];
  attachment?: AttachmentPayload;
}