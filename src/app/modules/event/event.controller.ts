import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EventServices } from './event.service';

const createEvent = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EventServices.createEventIntoDB(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Event created successfully',
    data: result,
  });
});

const getAllEvents = catchAsync(async (req, res) => {
  const result = await EventServices.getAllEventsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events retrieved successfully',
    data: result,
  });
});

const getSingleEvent = catchAsync(async (req, res) => {
  const result = await EventServices.getSingleEventFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event retrieved successfully',
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res) => {
  const result = await EventServices.updateEventIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event updated successfully',
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const result = await EventServices.deleteEventFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event deleted successfully',
    data: result,
  });
});

const rsvpEvent = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EventServices.rsvpEventIntoDB(req.params.id, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RSVP successful',
    data: result,
  });
});

const cancelRsvp = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EventServices.cancelRsvpFromDB(req.params.id, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RSVP cancelled successfully',
    data: result,
  });
});

const addEventPhotos = catchAsync(async (req, res) => {
  const result = await EventServices.addEventPhotosIntoDB(
    req.params.id,
    req.body.photos,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Photos added successfully',
    data: result,
  });
});

const approveEvent = catchAsync(async (req, res) => {
  const result = await EventServices.approveEventIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event approved successfully',
    data: result,
  });
});

export const EventControllers = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  cancelRsvp,
  addEventPhotos,
  approveEvent,
};