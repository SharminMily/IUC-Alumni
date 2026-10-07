import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { MentorshipControllers } from './mentorship.controller';
import { MentorshipValidation } from './mentorship.validation';

const router = express.Router();

router.post('/request', auth(USER_ROLE.student, USER_ROLE.alumni), validateRequest(MentorshipValidation.sendRequestValidationSchema), MentorshipControllers.sendRequest);
router.get('/my-requests', auth(USER_ROLE.alumni, USER_ROLE.student), MentorshipControllers.getMyRequests);
router.patch('/:id/accept', auth(USER_ROLE.alumni), MentorshipControllers.acceptRequest);
router.patch('/:id/reject', auth(USER_ROLE.alumni), MentorshipControllers.rejectRequest);
router.patch('/:id/complete', auth(USER_ROLE.alumni, USER_ROLE.student), MentorshipControllers.completeRequest);

export const MentorshipRoutes = router;