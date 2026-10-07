import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Post } from './post.model';
import { TPost } from './post.interface';
import { User } from '../user/user.model';
import { Types } from 'mongoose';

const createPostIntoDB = async (payload: TPost, userId: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  payload.author = user._id;
  return await Post.create(payload);
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const filter: Record<string, unknown> = { isDeleted: false };

  if (query.batch) filter.batch = Number(query.batch);
  if (query.department) filter.department = query.department;
  if (query.isAnnouncement) filter.isAnnouncement = query.isAnnouncement === 'true';

  return await Post.find(filter)
    .populate('author', 'id email role')
    .populate('likes', 'id email')
    .populate('comments.user', 'id email')
    .sort({ createdAt: -1 });
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById(id)
    .populate('author', 'id email role')
    .populate('likes', 'id email')
    .populate('comments.user', 'id email');

  if (!result || result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }
  return result;
};

const deletePostFromDB = async (id: string) => {
  const result = await Post.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  return result;
};

const likePostIntoDB = async (postId: string, userId: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const post = await Post.findById(postId);
  if (!post || post.isDeleted) throw new AppError(httpStatus.NOT_FOUND, 'Post not found');

  const alreadyLiked = post.likes?.some((id: Types.ObjectId) => id.toString() === user._id.toString());

  if (alreadyLiked) {
    post.likes = post.likes?.some((id: Types.ObjectId) => id.toString() === user._id.toString());
  } else {
    post.likes?.push(user._id);
  }

  await post.save();
  return post;
};

const addCommentIntoDB = async (postId: string, userId: string, text: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const post = await Post.findById(postId);
  if (!post || post.isDeleted) throw new AppError(httpStatus.NOT_FOUND, 'Post not found');

  post.comments?.push({ user: user._id, text, createdAt: new Date() });
  await post.save();
  return post;
};

const deleteCommentFromDB = async (postId: string, commentId: string) => {
  const post = await Post.findById(postId);
  if (!post) throw new AppError(httpStatus.NOT_FOUND, 'Post not found');

  post.comments = post.comments?.filter(
    (c: any) => c._id.toString() !== commentId,
  ) as any;

  await post.save();
  return post;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
  deletePostFromDB,
  likePostIntoDB,
  addCommentIntoDB,
  deleteCommentFromDB,
};