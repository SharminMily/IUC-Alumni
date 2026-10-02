import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();
//will call controller

// router.post('/create-student', StudentControllers.createStudent);

router.get('/', StudentControllers.getAllStudent);

router.get('/:id', StudentControllers.getSingleStudent);

router.patch('/:id',
    validateRequest(updateStudentValidationSchema),
    StudentControllers.updatedStudent
);

router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoute = router;
