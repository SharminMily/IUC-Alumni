import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { JobControllers } from './job.controller';
import { JobValidation } from './job.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.alumni, USER_ROLE.admin),
  validateRequest(JobValidation.createJobValidationSchema),
  JobControllers.createJob,
);

router.get('/', JobControllers.getAllJobs);

router.get(
  '/my-applications',
  auth(USER_ROLE.alumni, USER_ROLE.student),
  JobControllers.getMyApplications,
);

router.get('/:id', JobControllers.getSingleJob);

router.patch(
  '/:id',
  auth(USER_ROLE.alumni, USER_ROLE.admin),
  validateRequest(JobValidation.updateJobValidationSchema),
  JobControllers.updateJob,
);

router.delete(
  '/:id',
  auth(USER_ROLE.alumni, USER_ROLE.admin),
  JobControllers.deleteJob,
);

router.post(
  '/:id/apply',
  auth(USER_ROLE.alumni, USER_ROLE.student),
  validateRequest(JobValidation.applyJobValidationSchema),
  JobControllers.applyToJob,
);

router.patch(
  '/:jobId/applications/:appId',
  auth(USER_ROLE.alumni, USER_ROLE.admin),
  validateRequest(JobValidation.updateApplicationStatusValidationSchema),
  JobControllers.updateApplicationStatus,
);

router.patch(
  '/:id/approve',
  auth(USER_ROLE.admin),
  JobControllers.approveJob,
);

export const JobRoutes = router;