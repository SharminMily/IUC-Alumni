import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MentorshipServices } from './mentorship.service';

const sendRequest = catchAsync(async (req, res) => {
  const result = await MentorshipServices.sendRequestIntoDB(req.user.userId, req.body.mentorId, req.body.message);
  sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: 'Mentorship request sent', data: result });
});

const getMyRequests = catchAsync(async (req, res) => {
  const result = await MentorshipServices.getMyRequestsFromDB(req.user.userId);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Requests retrieved', data: result });
});

const acceptRequest = catchAsync(async (req, res) => {
  const result = await MentorshipServices.acceptRequestIntoDB(req.params.id, req.user.userId);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Request accepted', data: result });
});

const rejectRequest = catchAsync(async (req, res) => {
  const result = await MentorshipServices.rejectRequestIntoDB(req.params.id, req.user.userId);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Request rejected', data: result });
});

const completeRequest = catchAsync(async (req, res) => {
  const result = await MentorshipServices.completeRequestIntoDB(req.params.id, req.user.userId);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Mentorship completed', data: result });
});

export const MentorshipControllers = {
  sendRequest, getMyRequests, acceptRequest, rejectRequest, completeRequest,
};