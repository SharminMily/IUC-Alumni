import { z } from 'zod';

const sendRequestValidationSchema = z.object({
  body: z.object({
    mentorId: z.string().min(1, { message: 'Mentor ID is required' }),
    message: z.string().max(500).optional(),
  }),
});

export const MentorshipValidation = { sendRequestValidationSchema };