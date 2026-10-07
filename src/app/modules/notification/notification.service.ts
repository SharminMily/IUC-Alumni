import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Notification } from './notification.model';
import { User } from '../user/user.model';

const getMyNotificationsFromDB = async (userId: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  return await Notification.find({ recipient: user._id })
    .populate('sender', 'id email')
    .sort({ createdAt: -1 });
};

const markAsReadIntoDB = async (id: string, userId: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const result = await Notification.findOneAndUpdate(
    { _id: id, recipient: user._id },
    { isRead: true },
    { new: true },
  );
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Notification not found');
  return result;
};

const markAllAsReadIntoDB = async (userId: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  await Notification.updateMany({ recipient: user._id, isRead: false }, { isRead: true });
  return { message: 'All notifications marked as read' };
};

// Helper — অন্য module থেকে call করবে
const createNotification = async (payload: {
  recipient: string;
  sender?: string;
  type: string;
  message: string;
  link?: string;
}) => {
  return await Notification.create(payload);
};

export const NotificationServices = {
  getMyNotificationsFromDB,
  markAsReadIntoDB,
  markAllAsReadIntoDB,
  createNotification,
};