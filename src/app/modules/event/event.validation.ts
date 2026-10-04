import { z } from 'zod';

const createEventValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    date: z.string().min(1, { message: 'Date is required' }),
    endDate: z.string().optional(),
    location: z.string().min(1, { message: 'Location is required' }),
    isOnline: z.boolean().optional(),
    meetingLink: z.string().optional(),
    coverImage: z.string().optional(),
    maxAttendees: z.number().optional(),
  }),
});

const updateEventValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    endDate: z.string().optional(),
    location: z.string().optional(),
    isOnline: z.boolean().optional(),
    meetingLink: z.string().optional(),
    coverImage: z.string().optional(),
    maxAttendees: z.number().optional(),
  }),
});

const addPhotosValidationSchema = z.object({
  body: z.object({
    photos: z.array(z.string()).min(1, { message: 'At least one photo is required' }),
  }),
});

export const EventValidation = {
  createEventValidationSchema,
  updateEventValidationSchema,
  addPhotosValidationSchema,
};