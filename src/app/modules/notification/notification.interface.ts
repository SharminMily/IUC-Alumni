import { Types } from 'mongoose';

export type TNotification = {
  recipient: Types.ObjectId;
  sender?: Types.ObjectId;
  type: string;
  message: string;
  link?: string;
  isRead?: boolean;
};