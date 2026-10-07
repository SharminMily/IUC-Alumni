import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Mentorship } from './mentorship.model';
import { User } from '../user/user.model';

const sendRequestIntoDB = async (menteeUserId: string, mentorId: string, message?: string) => {
  const mentee = await User.findOne({ id: menteeUserId });
  const mentor = await User.findById(mentorId);

  if (!mentee) throw new AppError(httpStatus.NOT_FOUND, 'Mentee not found');
  if (!mentor) throw new AppError(httpStatus.NOT_FOUND, 'Mentor not found');
  if (mentor.role !== 'alumni') throw new AppError(httpStatus.BAD_REQUEST, 'Mentor must be an alumni');

  const exists = await Mentorship.findOne({
    mentor: mentor._id,
    mentee: mentee._id,
    status: { $in: ['Pending', 'Accepted'] },
  });
  if (exists) throw new AppError(httpStatus.BAD_REQUEST, 'Request already exists');

  return await Mentorship.create({
    mentor: mentor._id,
    mentee: mentee._id,
    message,
  });
};

const getMyRequestsFromDB = async (userId: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  return await Mentorship.find({
    $or: [{ mentor: user._id }, { mentee: user._id }],
  })
    .populate('mentor', 'id email role')
    .populate('mentee', 'id email role')
    .sort({ createdAt: -1 });
};

const acceptRequestIntoDB = async (id: string, userId: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const request = await Mentorship.findOne({ _id: id, mentor: user._id, status: 'Pending' });
  if (!request) throw new AppError(httpStatus.NOT_FOUND, 'Request not found');

  request.status = 'Accepted';
  await request.save();
  return request;
};

const rejectRequestIntoDB = async (id: string, userId: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const request = await Mentorship.findOne({ _id: id, mentor: user._id, status: 'Pending' });
  if (!request) throw new AppError(httpStatus.NOT_FOUND, 'Request not found');

  request.status = 'Rejected';
  await request.save();
  return request;
};

const completeRequestIntoDB = async (id: string, userId: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const request = await Mentorship.findOne({
    _id: id,
    status: 'Accepted',
    $or: [{ mentor: user._id }, { mentee: user._id }],
  });
  if (!request) throw new AppError(httpStatus.NOT_FOUND, 'Request not found');

  request.status = 'Completed';
  await request.save();
  return request;
};

export const MentorshipServices = {
  sendRequestIntoDB,
  getMyRequestsFromDB,
  acceptRequestIntoDB,
  rejectRequestIntoDB,
  completeRequestIntoDB,
};