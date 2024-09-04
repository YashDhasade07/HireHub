import JobModel from "../models/jobs.model.js";
import ApplicantModel from "../models/applicant.model.js";
import path from 'path';
export default class JobsController {

    // displays new job form
    getJobForm(req, res) {
        res.render('newJobForm', { errorMessage: null });
        // res.render('newJobForm')
    }

    // Posts new job
    setJobForm(req, res) {
        let job = req.body;
        const recruiterEmail = req.session.userEmail; // Get the recruiter's email from the session
        JobModel.addJob(job, recruiterEmail); // Pass the recruiter's email to addJob
        let jobs = JobModel.get();
        // console.log(jobs);
        res.render('jobs', { jobs })
    }

    // to display job details
    getJobDetails(req, res) {
        let id = req.params.id;
        const job = JobModel.getJobById(id);
        if (job) {
            res.render('jobDetails', { job, errorMessage: null })
        } else {
            res.send('job ID not available')
        }
    }

    // Adds applicant to the job
    setApplicant(req, res, next) {
        const filePath = req.file.filename;
        // const filePath = path.join('resume', req.file.filename);
        // path may be wrong
        const { name, email, contact } = req.body;
        const jobId = req.params.id;
        ApplicantModel.addApplicant(name, email, contact, filePath, jobId);
        res.redirect(`/getjobs`);
    };


    // renders all jobs page
    getJob(req, res) {
        let jobs = JobModel.get();
        res.render('jobs', { jobs })
    }

    // displays update job form
    getUpdateForm(req, res) {
        const jobId = req.params.id;
        let job = JobModel.getJobById(jobId);
        if (job.recruiterEmail === req.session.userEmail) {
            res.render('updateJobForm', { job: job, errorMessage: null });
        } else {
            const errMessage = 'You are not the recruiter of this Job, You are not authorized to edit this job'
            res.render('error', { errMessage })
            // res.send('You are not authorized to edit this job');
        }
    }

    // update the job object
    setUpdateForm(req, res) {
        const jobId = req.params.id;
        let job = JobModel.getJobById(jobId);
        if (job.recruiterEmail === req.session.userEmail) {
            JobModel.updateJob(jobId, req.body);
            res.redirect(`/job/${jobId}`);
        } else {
            const errMessage = 'You are not the recruiter of this Job, You are not authorized to update this job'
            res.render('error', { errMessage })
            // res.send('You are not authorized to update this job');
        }

    }

    // remove the job object
    removeJob(req, res) {
        const jobId = req.params.id;
        let job = JobModel.getJobById(jobId);
        if (job.recruiterEmail === req.session.userEmail) {
            JobModel.deleteJob(jobId);
            res.redirect(`/getjobs`);
        } else {
            const errMessage = 'You are not the recruiter of this Job, You are not authorized to delete this job'
            res.render('error', { errMessage })
            // res.send('You are not authorized to delete this job');
        }

    }

    // searches for the job with query
    searchJobs(req, res) {
        const query = req.query.query.toLowerCase();
        const jobs = JobModel.get();
        const filteredJobs = jobs.filter(job => job.companyName.toLowerCase().includes(query));
        res.render('jobs', { jobs: filteredJobs });
    }
}

