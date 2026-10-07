import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { PostControllers } from './post.controller';
import { PostValidation } from './post.validation';

const router = express.Router();

router.post('/', auth(USER_ROLE.alumni, USER_ROLE.student, USER_ROLE.admin), validateRequest(PostValidation.createPostValidationSchema), PostControllers.createPost);
router.get('/', PostControllers.getAllPosts);
router.get('/:id', PostControllers.getSinglePost);
router.delete('/:id', auth(USER_ROLE.alumni, USER_ROLE.student, USER_ROLE.admin), PostControllers.deletePost);
router.post('/:id/like', auth(USER_ROLE.alumni, USER_ROLE.student, USER_ROLE.admin), PostControllers.likePost);
router.post('/:id/comment', auth(USER_ROLE.alumni, USER_ROLE.student, USER_ROLE.admin), validateRequest(PostValidation.addCommentValidationSchema), PostControllers.addComment);
router.delete('/:id/comment/:commentId', auth(USER_ROLE.alumni, USER_ROLE.student, USER_ROLE.admin), PostControllers.deleteComment);

export const PostRoutes = router;