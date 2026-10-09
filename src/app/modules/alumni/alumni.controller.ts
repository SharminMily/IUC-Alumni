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
  // console.log('PARAMS ID:', req.params.id);
  // console.log('FILE:', req.file);
  // console.log('BODY:', req.body);

  const payload = { ...req.body }
  // Image upload then URL set 
if (req.file) {
  const fullPublicId = req.file.filename;
  const shortId = fullPublicId.split('/').pop();
  // payload.profilePicture = shortId;
  payload.profilePicture = `https://${shortId}`;
}

  const result = await AlumniServices.updateAlumniIntoDB(req.params.id, payload)

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