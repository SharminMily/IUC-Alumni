import { Schema, model, models } from 'mongoose';
import { TPost, TComment } from './post.interface';

const commentSchema = new Schema<TComment>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const postSchema = new Schema<TPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, maxlength: 2000 },
    images: { type: [String], default: [] },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: { type: [commentSchema], default: [] },
    isAnnouncement: { type: Boolean, default: false },
    batch: { type: Number },
    department: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Post = models.Post || model<TPost>('Post', postSchema);