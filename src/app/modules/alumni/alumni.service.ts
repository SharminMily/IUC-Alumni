import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Alumni } from './alumni.model';
import { TAlumni } from './alumni.interface';

const getAllAlumniFromDB = async (query: Record<string, unknown>) => {
  const filter: Record<string, unknown> = { isDeleted: false };

  // Search
  if (query.searchTerm) {
    const searchTerm = query.searchTerm as string;
    filter.$or = [
      { 'name.firstName': { $regex: searchTerm, $options: 'i' } },
      { 'name.lastName': { $regex: searchTerm, $options: 'i' } },
      { email: { $regex: searchTerm, $options: 'i' } },
      { department: { $regex: searchTerm, $options: 'i' } },
      { currentCompany: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  // Extra filters
  if (query.batch) filter.batch = Number(query.batch);
  if (query.department) filter.department = query.department;
  if (query.location) filter.location = query.location;

  const result = await Alumni.find(filter).populate('user');
  return result;
};

const getSingleAlumniFromDB = async (id: string) => {
  const result = await Alumni.findOne({ id, isDeleted: false }).populate('user');
  return result;
};

const updateAlumniIntoDB = async (id: string, payload: Partial<TAlumni>) => {
  const { name, ...remainingData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  const result = await Alumni.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteAlumniFromDB = async (id: string) => {
  const result = await Alumni.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const AlumniServices = {
  getAllAlumniFromDB,
  getSingleAlumniFromDB,
  updateAlumniIntoDB,
  deleteAlumniFromDB,
};