import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Job } from './job.model';
import { TJob } from './job.interface';
import { Types } from 'mongoose';
import { User } from '../user/user.model';

const createJobIntoDB = async (payload: TJob, userId: string) => {
  const user = await User.findOne({ id: userId });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  payload.postedBy = user._id;  
  const result = await Job.create(payload);
  return result;
};
const getAllJobsFromDB = async (query: Record<string, unknown>) => {
  const filter: Record<string, unknown> = {
    isDeleted: false,
    isActive: true,
    isApproved: true,
  };

  if (query.searchTerm) {
    const searchTerm = query.searchTerm as string;
    filter.$or = [
      { title: { $regex: searchTerm, $options: 'i' } },
      { company: { $regex: searchTerm, $options: 'i' } },
      { location: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  if (query.type) filter.type = query.type;
  if (query.location) filter.location = query.location;

  const result = await Job.find(filter)
    .populate('postedBy', 'id email role')
    .sort({ createdAt: -1 });

  return result;
};

const getSingleJobFromDB = async (id: string) => {
  const result = await Job.findById(id)
    .populate('postedBy', 'id email role')
    .populate('applications.user', 'id email');

  if (!result || result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Job not found');
  }

  return result;
};

const updateJobIntoDB = async (id: string, payload: Partial<TJob>) => {
  const result = await Job.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Job not found');
  }

  return result;
};

const deleteJobFromDB = async (id: string) => {
  const result = await Job.findByIdAndUpdate(
    id,
    { isDeleted: true, isActive: false },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Job not found');
  }

  return result;
};

const applyToJobIntoDB = async (
  jobId: string,
  userId: string,
  payload: { resume?: string; coverLetter?: string },
) => {
  const user = await User.findOne({ id: userId });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const job = await Job.findById(jobId);

  if (!job || job.isDeleted || !job.isActive) {
    throw new AppError(httpStatus.NOT_FOUND, 'Job not found');
  }

  const alreadyApplied = job.applications?.some(
    (app: any) => app.user.toString() === user._id.toString(),
  );

  if (alreadyApplied) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Already applied to this job');
  }

  job.applications?.push({
    user: user._id,
    resume: payload.resume,
    coverLetter: payload.coverLetter,
    status: 'Pending',
    appliedAt: new Date(),
  });

  await job.save();
  return job;
};

const updateApplicationStatusIntoDB = async (
  jobId: string,
  applicationId: string,
  status: 'Pending' | 'Accepted' | 'Rejected',
) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new AppError(httpStatus.NOT_FOUND, 'Job not found');
  }

  const application = job.applications?.find(
    (app: any) => app._id.toString() === applicationId,
  );

  if (!application) {
    throw new AppError(httpStatus.NOT_FOUND, 'Application not found');
  }

  application.status = status;
  await job.save();

  return job;
};

const approveJobIntoDB = async (id: string) => {
  const result = await Job.findByIdAndUpdate(
    id,
    { isApproved: true },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Job not found');
  }

  return result;
};

const getMyApplicationsFromDB = async (userId: string) => {
  const user = await User.findOne({ id: userId });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Job.find({
    'applications.user': user._id,
    isDeleted: false,
  }).populate('postedBy', 'id email');

  return result;
};

export const JobServices = {
  createJobIntoDB,
  getAllJobsFromDB,
  getSingleJobFromDB,
  updateJobIntoDB,
  deleteJobFromDB,
  applyToJobIntoDB,
  updateApplicationStatusIntoDB,
  approveJobIntoDB,
  getMyApplicationsFromDB,
};