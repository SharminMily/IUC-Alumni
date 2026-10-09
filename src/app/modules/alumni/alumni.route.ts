import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';

import { AlumniValidation } from './alumni.validation';
import { AlumniControllers } from './alumni.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.get('/', AlumniControllers.getAllAlumni);

router.get('/:id', AlumniControllers.getSingleAlumni);

router.patch(
  '/:id',
  auth(USER_ROLE.alumni, USER_ROLE.admin),
  upload.single('profilePicture'),
  validateRequest(AlumniValidation.updateAlumniValidationSchema),
  AlumniControllers.updateAlumni,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  AlumniControllers.deleteAlumni,
);

export const AlumniRoutes = router;