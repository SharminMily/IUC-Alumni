import { Types } from 'mongoose';

export type TAlumniName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TAlumni = {
  id: string;
  user: Types.ObjectId;
  name: TAlumniName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress?: string;
  permanentAddress?: string;
  profilePicture?: string;

  // Alumni specific
  batch: number;
  department: string;
  currentCompany?: string;
  designation?: string;
  location?: string;
  skills?: string[];
  bio?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  resume?: string;
  isProfilePublic?: boolean;
  isVerified?: boolean;

  isDeleted?: boolean;
};