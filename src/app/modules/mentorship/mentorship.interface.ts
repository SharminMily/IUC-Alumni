import { Types } from 'mongoose';

export type TMentorship = {
  mentor: Types.ObjectId;
  mentee: Types.ObjectId;
  message?: string;
  status?: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
};