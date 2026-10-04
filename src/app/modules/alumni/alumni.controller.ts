import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AlumniServices } from './alumni.service';

const getAllAlumni = catchAsync(async (req, res) => {
  const result = await AlumniServices.getAllAlumniFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Alumni retrieved successfully',
    data: result,  
  });
});

const getSingleAlumni = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AlumniServices.getSingleAlumniFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Alumni retrieved successfully',
    data: result,
  });
});

const updateAlumni = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AlumniServices.updateAlumniIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Alumni updated successfully',
    data: result,
  });
});

const deleteAlumni = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AlumniServices.deleteAlumniFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Alumni deleted successfully',
    data: result,
  });
});

export const AlumniControllers = {
  getAllAlumni,
  getSingleAlumni,
  updateAlumni,
  deleteAlumni,
};