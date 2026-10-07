import { Schema, model, models } from 'mongoose';
import { TMentorship } from './mentorship.interface';

const mentorshipSchema = new Schema<TMentorship>(
  {
    mentor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mentee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, maxlength: 500 },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true },
);

export const Mentorship = models.Mentorship || model<TMentorship>('Mentorship', mentorshipSchema);