import { Types } from 'mongoose';

export type TEvent = {
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  location: string;
  isOnline?: boolean;
  meetingLink?: string;
  coverImage?: string;
  createdBy: Types.ObjectId;
  attendees?: Types.ObjectId[];
  maxAttendees?: number;
  photos?: string[];
  isApproved?: boolean;
  isDeleted?: boolean;
};