import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NotificationServices } from './notification.service';

const getMyNotifications = catchAsync(async (req, res) => {
  const result = await NotificationServices.getMyNotificationsFromDB(req.user.userId);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Notifications retrieved', data: result });
});

const markAsRead = catchAsync(async (req, res) => {
  const result = await NotificationServices.markAsReadIntoDB(req.params.id, req.user.userId);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Marked as read', data: result });
});

const markAllAsRead = catchAsync(async (req, res) => {
  const result = await NotificationServices.markAllAsReadIntoDB(req.user.userId);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'All marked as read', data: result });
});

export const NotificationControllers = { getMyNotifications, markAsRead, markAllAsRead };