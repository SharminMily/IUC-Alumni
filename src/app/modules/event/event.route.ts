import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { EventControllers } from './event.controller';
import { EventValidation } from './event.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.alumni, USER_ROLE.admin),
  validateRequest(EventValidation.createEventValidationSchema),
  EventControllers.createEvent,
);

router.get('/', EventControllers.getAllEvents);

router.get('/:id', EventControllers.getSingleEvent);

router.patch(
  '/:id',
  auth(USER_ROLE.alumni, USER_ROLE.admin),
  validateRequest(EventValidation.updateEventValidationSchema),
  EventControllers.updateEvent,
);

router.delete(
  '/:id',
  auth(USER_ROLE.alumni, USER_ROLE.admin),
  EventControllers.deleteEvent,
);

router.post(
  '/:id/rsvp',
  auth(USER_ROLE.alumni, USER_ROLE.student, USER_ROLE.admin),
  EventControllers.rsvpEvent,
);

router.delete(
  '/:id/rsvp',
  auth(USER_ROLE.alumni, USER_ROLE.student, USER_ROLE.admin),
  EventControllers.cancelRsvp,
);

router.post(
  '/:id/photos',
  auth(USER_ROLE.alumni, USER_ROLE.admin),
  validateRequest(EventValidation.addPhotosValidationSchema),
  EventControllers.addEventPhotos,
);

router.patch(
  '/:id/approve',
  auth(USER_ROLE.admin),
  EventControllers.approveEvent,
);

export const EventRoutes = router;