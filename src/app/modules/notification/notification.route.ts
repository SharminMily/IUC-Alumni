import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { NotificationControllers } from './notification.controller';

const router = express.Router();

router.get('/', auth(USER_ROLE.alumni, USER_ROLE.student, USER_ROLE.admin), NotificationControllers.getMyNotifications);
router.patch('/:id/read', auth(USER_ROLE.alumni, USER_ROLE.student, USER_ROLE.admin), NotificationControllers.markAsRead);
router.patch('/read-all', auth(USER_ROLE.alumni, USER_ROLE.student, USER_ROLE.admin), NotificationControllers.markAllAsRead);

export const NotificationRoutes = router;