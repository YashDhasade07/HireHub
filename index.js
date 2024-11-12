import session from 'express-session';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import UserController from './src/controller/user.controller.js';
import JobsController from './src/controller/jobs.controller.js';
import { uploadFile } from './src/middlewares/resume-upload.middleware.js';
import { confirmEmail } from './src/middlewares/confirm-email.middleware.js';
import ApplicantController from './src/controller/applicant.controller.js';
import validateRequest from './src/middlewares/applicantValidation.js';
import express from 'express'
import auth from './src/middlewares/auth.middleware.js';
import { auth2 } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
import jobValidate from './src/middlewares/jobValidation.middleWare.js';
import { connectUsingMongoose } from './src/config/mongoose.js';

// instances of controller classes
const userController = new UserController();
const jobsController = new JobsController();
const applicantController = new ApplicantController();
let app = express();
app.use(cookieParser());
app.use(setLastVisit)
app.use(session({
  secret: 'SecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
})
);
app.use(ejsLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));
// app.use(express.static(path.join(path.resolve(), 'src', 'views')));

app.use(express.static('public'));

app.get('/', auth2, userController.getPage.bind(userController));
app.post('/register', userController.setRegister.bind(userController), userController.getLogin.bind(userController));
app.post('/login', userController.setLogin.bind(userController));
app.get('/postjob', auth, jobsController.getJobForm.bind(jobsController));
app.post('/job', jobValidate, jobsController.setJobForm.bind(jobsController));
app.get('/job/:id', jobsController.getJobDetails.bind(jobsController));
app.post('/apply/:id', uploadFile.single('resume'), validateRequest, confirmEmail, jobsController.setApplicant.bind(jobsController));
app.get('/jobs', jobsController.getJob.bind(jobsController));
app.get('/job/update/:id', auth, jobsController.getUpdateForm.bind(jobsController));
app.post('/update/:id', auth, jobValidate, jobsController.setUpdateForm.bind(jobsController));
app.get('/job/delete/:id', auth, jobsController.removeJob.bind(jobsController));
app.get('/job/applicants/:id', auth, applicantController.getApplicantList.bind(applicantController));
app.get('/getjobs', jobsController.getJob.bind(jobsController));
app.get('/logout', userController.logout.bind(userController));
app.get('/search', jobsController.searchJobs.bind(jobsController));


app.listen(3200, () => {
  console.log('Server is running on port 3200');
  connectUsingMongoose()
});
