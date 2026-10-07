import { Types } from 'mongoose';

export type TComment = {
  user: Types.ObjectId;
  text: string;
  createdAt?: Date;
};

export type TPost = {
  author: Types.ObjectId;
  content: string;
  images?: string[];
  likes?: Types.ObjectId[];
  comments?: TComment[];
  isAnnouncement?: boolean;
  batch?: number;
  department?: string;
  isDeleted?: boolean;
};