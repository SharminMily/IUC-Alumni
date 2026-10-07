import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostServices } from './post.service';

const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(req.body, req.user.userId);
  sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: 'Post created successfully', data: result });
});

const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostsFromDB(req.query);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Posts retrieved successfully', data: result });
});

const getSinglePost = catchAsync(async (req, res) => {
  const result = await PostServices.getSinglePostFromDB(req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Post retrieved successfully', data: result });
});

const deletePost = catchAsync(async (req, res) => {
  const result = await PostServices.deletePostFromDB(req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Post deleted successfully', data: result });
});

const likePost = catchAsync(async (req, res) => {
  const result = await PostServices.likePostIntoDB(req.params.id, req.user.userId);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Post like toggled successfully', data: result });
});

const addComment = catchAsync(async (req, res) => {
  const result = await PostServices.addCommentIntoDB(req.params.id, req.user.userId, req.body.text);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Comment added successfully', data: result });
});

const deleteComment = catchAsync(async (req, res) => {
  const result = await PostServices.deleteCommentFromDB(req.params.id, req.params.commentId);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Comment deleted successfully', data: result });
});

export const PostControllers = {
  createPost, getAllPosts, getSinglePost, deletePost, likePost, addComment, deleteComment,
};