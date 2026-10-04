import { Types } from 'mongoose';

export type TJobType = 'Full-time' | 'Part-time' | 'Internship' | 'Remote' | 'Contract';

export type TApplicationStatus = 'Pending' | 'Accepted' | 'Rejected';

export type TJobApplication = {
  user: Types.ObjectId;
  resume?: string;
  coverLetter?: string;
  status: TApplicationStatus;
  appliedAt: Date;
};

export type TJob = {
  title: string;
  company: string;
  location: string;
  type: TJobType;
  experience?: string;
  description: string;
  requirements?: string[];
  salary?: string;
  postedBy: Types.ObjectId;
  applications?: TJobApplication[];
  isActive?: boolean;
  isApproved?: boolean;
  isDeleted?: boolean;
};