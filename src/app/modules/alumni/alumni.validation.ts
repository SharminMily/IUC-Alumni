import { z } from 'zod';

const createAlumniValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    alumni: z.object({
      name: z.object({
        firstName: z.string().min(1, { message: 'First name is required' }),
        middleName: z.string().optional(),
        lastName: z.string().min(1, { message: 'Last name is required' }),
      }),
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }),
      contactNo: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),

      // Alumni specific fields
      batch: z.number({ required_error: 'Batch/Graduation year is required' }),
      department: z.string().min(1, { message: 'Department is required' }),
      currentCompany: z.string().optional(),
      designation: z.string().optional(),
      location: z.string().optional(),
      skills: z.array(z.string()).optional(),
      bio: z.string().max(500).optional(),
      linkedin: z.string().url().optional().or(z.literal('')),
      github: z.string().url().optional().or(z.literal('')),
      website: z.string().url().optional().or(z.literal('')),
      profilePicture: z.string().optional(),
      resume: z.string().optional(),
      isProfilePublic: z.boolean().optional().default(true),
    }),
  }),
});

export const AlumniValidation = {
  createAlumniValidationSchema,
};