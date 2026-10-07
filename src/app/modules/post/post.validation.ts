import { z } from 'zod';

const createPostValidationSchema = z.object({
  body: z.object({
    content: z.string().min(1, { message: 'Content is required' }).max(2000),
    images: z.array(z.string()).optional(),
    isAnnouncement: z.boolean().optional(),
    batch: z.number().optional(),
    department: z.string().optional(),
  }),
});

const addCommentValidationSchema = z.object({
  body: z.object({
    text: z.string().min(1, { message: 'Comment text is required' }),
  }),
});

export const PostValidation = {
  createPostValidationSchema,
  addCommentValidationSchema,
};