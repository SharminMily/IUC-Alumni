/* eslint-disable no-unused-vars */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';
import { UserRoute } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from './app/modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from './app/modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from './app/modules/faculty/faculty.route';
import { CourseRoutes } from './app/modules/Course/course.route';
import { semesterRegistrationRoutes } from './app/modules/semesterRegistration/semesterRegistration.route';
import { AdminRoutes } from './app/modules/Admin/admin.route';
import { offeredCourseRoutes } from './app/modules/OfferedCourse/OfferedCourse.route';
import { authRoutes } from './app/modules/Auth/auth.route';
import cookieParser  from'cookie-parser'
import { AlumniRoutes } from './app/modules/alumni/alumni.route';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: ['http://localhost:5173/api/v1']}));

//application route
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/students', StudentRoute);
app.use('/api/v1/users', UserRoute);
app.use('/api/v1/admins', AdminRoutes);

app.use('/api/v1/academic-semsters', AcademicSemesterRoutes);
app.use('/api/v1/academic-facultys', AcademicFacultyRoutes);
app.use('/api/v1/academic-departments', AcademicDepartmentRoutes);
app.use('/api/v1/facultys', FacultyRoutes);

app.use('/api/v1/courses', CourseRoutes);
app.use('/api/v1/semester-registration', semesterRegistrationRoutes);
app.use('/api/v1/offered-courses', offeredCourseRoutes);

app.use('/api/v1/alumni', AlumniRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;

  res.json({
    success: true,
    value: a,
  });
};

app.get('/', getAController);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
