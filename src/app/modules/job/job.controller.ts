import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { JobServices } from './job.service';

const createJob = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await JobServices.createJobIntoDB(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Job created successfully',
    data: result,
  });
});

const getAllJobs = catchAsync(async (req, res) => {
  const result = await JobServices.getAllJobsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Jobs retrieved successfully',
    data: result,
  });
});

const getSingleJob = catchAsync(async (req, res) => {
  const result = await JobServices.getSingleJobFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job retrieved successfully',
    data: result,
  });
});

const updateJob = catchAsync(async (req, res) => {
  const result = await JobServices.updateJobIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job updated successfully',
    data: result,
  });
});

const deleteJob = catchAsync(async (req, res) => {
  const result = await JobServices.deleteJobFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job deleted successfully',
    data: result,
  });
});

const applyToJob = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await JobServices.applyToJobIntoDB(
    req.params.id,
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Applied to job successfully',
    data: result,
  });
});

const updateApplicationStatus = catchAsync(async (req, res) => {
  const { jobId, appId } = req.params;
  const result = await JobServices.updateApplicationStatusIntoDB(
    jobId,
    appId,
    req.body.status,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application status updated successfully',
    data: result,
  });
});

const approveJob = catchAsync(async (req, res) => {
  const result = await JobServices.approveJobIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job approved successfully',
    data: result,
  });
});

const getMyApplications = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await JobServices.getMyApplicationsFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My applications retrieved successfully',
    data: result,
  });
});

export const JobControllers = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  applyToJob,
  updateApplicationStatus,
  approveJob,
  getMyApplications,
};