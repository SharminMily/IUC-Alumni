import { z } from 'zod';

const createJobValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    company: z.string().min(1, { message: 'Company is required' }),
    location: z.string().min(1, { message: 'Location is required' }),
    type: z.enum(['Full-time', 'Part-time', 'Internship', 'Remote', 'Contract']),
    experience: z.string().optional(),
    description: z.string().min(1, { message: 'Description is required' }),
    requirements: z.array(z.string()).optional(),
    salary: z.string().optional(),
  }),
});

const updateJobValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    company: z.string().optional(),
    location: z.string().optional(),
    type: z
      .enum(['Full-time', 'Part-time', 'Internship', 'Remote', 'Contract'])
      .optional(),
    experience: z.string().optional(),
    description: z.string().optional(),
    requirements: z.array(z.string()).optional(),
    salary: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const applyJobValidationSchema = z.object({
  body: z.object({
    resume: z.string().optional(),
    coverLetter: z.string().optional(),
  }),
});

const updateApplicationStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(['Pending', 'Accepted', 'Rejected']),
  }),
});

export const JobValidation = {
  createJobValidationSchema,
  updateJobValidationSchema,
  applyJobValidationSchema,
  updateApplicationStatusValidationSchema,
};