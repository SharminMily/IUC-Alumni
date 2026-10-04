import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Event } from './event.model';
import { TEvent } from './event.interface';
import { User } from '../user/user.model';

const createEventIntoDB = async (payload: TEvent, userId: string) => {
  const user = await User.findOne({ id: userId });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  payload.createdBy = user._id;
  const result = await Event.create(payload);
  return result;
};

const getAllEventsFromDB = async (query: Record<string, unknown>) => {
  const filter: Record<string, unknown> = {
    isDeleted: false,
    isApproved: true,
  };

  if (query.searchTerm) {
    const searchTerm = query.searchTerm as string;
    filter.$or = [
      { title: { $regex: searchTerm, $options: 'i' } },
      { location: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  if (query.isOnline !== undefined) {
    filter.isOnline = query.isOnline === 'true';
  }

  const result = await Event.find(filter)
    .populate('createdBy', 'id email role')
    .populate('attendees', 'id email')
    .sort({ date: 1 });

  return result;
};

const getSingleEventFromDB = async (id: string) => {
  const result = await Event.findById(id)
    .populate('createdBy', 'id email role')
    .populate('attendees', 'id email');

  if (!result || result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
  }

  return result;
};

const updateEventIntoDB = async (id: string, payload: Partial<TEvent>) => {
  const result = await Event.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
  }

  return result;
};

const deleteEventFromDB = async (id: string) => {
  const result = await Event.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
  }

  return result;
};

const rsvpEventIntoDB = async (eventId: string, userId: string) => {
  const user = await User.findOne({ id: userId });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const event = await Event.findById(eventId);

  if (!event || event.isDeleted || !event.isApproved) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
  }

  // Already RSVP check
  const alreadyJoined = event.attendees?.some(
    (attendee) => attendee.toString() === user._id.toString(),
  );

  if (alreadyJoined) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Already RSVP to this event');
  }

  // Max attendees check
  if (event.maxAttendees && event.attendees && event.attendees.length >= event.maxAttendees) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Event is full');
  }

  event.attendees?.push(user._id);
  await event.save();

  return event;
};

const cancelRsvpFromDB = async (eventId: string, userId: string) => {
  const user = await User.findOne({ id: userId });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const event = await Event.findById(eventId);

  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
  }

  event.attendees = event.attendees?.filter(
    (attendee) => attendee.toString() !== user._id.toString(),
  );

  await event.save();
  return event;
};

const addEventPhotosIntoDB = async (eventId: string, photos: string[]) => {
  const event = await Event.findById(eventId);

  if (!event || event.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
  }

  event.photos = [...(event.photos || []), ...photos];
  await event.save();

  return event;
};

const approveEventIntoDB = async (id: string) => {
  const result = await Event.findByIdAndUpdate(
    id,
    { isApproved: true },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
  }

  return result;
};

export const EventServices = {
  createEventIntoDB,
  getAllEventsFromDB,
  getSingleEventFromDB,
  updateEventIntoDB,
  deleteEventFromDB,
  rsvpEventIntoDB,
  cancelRsvpFromDB,
  addEventPhotosIntoDB,
  approveEventIntoDB,
};