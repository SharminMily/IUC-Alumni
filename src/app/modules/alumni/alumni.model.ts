import { Schema, model } from 'mongoose';
import { TAlumni, TAlumniName } from './alumni.interface';

const alumniNameSchema = new Schema<TAlumniName>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
  },
  { _id: false },
);

const alumniSchema = new Schema<TAlumni>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: alumniNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    profilePicture: {
      type: String,
    },

    // Alumni specific fields
    batch: {
      type: Number,
      required: [true, 'Batch/Graduation year is required'],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    currentCompany: {
      type: String,
    },
    designation: {
      type: String,
    },
    location: {
      type: String,
    },
    skills: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    website: {
      type: String,
    },
    resume: {
      type: String,
    },
    isProfilePublic: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

// Virtual full name
alumniSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName || ''} ${this.name.lastName}`.trim();
});

export const Alumni = model<TAlumni>('Alumni', alumniSchema);