import JobModel from "../models/jobs.model.js";
import ApplicantModel from "../models/applicant.model.js";
import path from 'path';
export default class JobsController {

    constructor() {
        this.jobRepository = new JobModel();
        this.applicantRepo = new ApplicantModel();
    }

    // displays new job form
    getJobForm(req, res) {
        res.render('newJobForm', { errorMessage: null });
        // res.render('newJobForm')
    }

    // Posts new job
    async setJobForm(req, res) {
        try {

            let job = req.body;
            const recruiterEmail = req.session.userEmail; // Get the recruiter's email from the session
            await this.jobRepository.addJob(job, recruiterEmail); // Pass the recruiter's email to addJob
            let jobs = await this.jobRepository.get();
            res.render('jobs', { jobs })
        } catch (error) {
            console.log(error);
        }
    }

    // to display job details
    async getJobDetails(req, res) {
        try {
            let id = req.params.id;
            const job = await this.jobRepository.getJobById(id);
            if (job) {
                res.render('jobDetails', { job, errorMessage: null })
            } else {
                res.send('job ID not available')
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Adds applicant to the job
    async setApplicant(req, res, next) {
        try {
            const filePath = req.file.filename;
            const { name, email, contact } = req.body;
            const jobId = req.params.id;
            await this.applicantRepo.addApplicant(name, email, contact, filePath, jobId);
            res.redirect(`/getjobs`);
        } catch (error) {
            console.log(error);
        }
    };


    // renders all jobs page
    async getJob(req, res) {
        try {
            let jobs = await this.jobRepository.get();
            res.render('jobs', { jobs })
            // if(jobs){
            //     res.render('jobs', { jobs })
            // }else{
            //     res.render('jobs', {jobs: null })              
            // }
        } catch (error) {
            console.log(error);
        }
    }

    // displays update job form
    async getUpdateForm(req, res) {
        try {
            const jobId = req.params.id;
            let job = await this.jobRepository.getJobById(jobId);
            if (job.recruiterEmail === req.session.userEmail) {
                res.render('updateJobForm', { job: job, errorMessage: null });
            } else {
                const errMessage = 'You are not the recruiter of this Job, You are not authorized to edit this job'
                res.render('error', { errMessage })
                // res.send('You are not authorized to edit this job');
            }


        } catch (error) {
            console.log(error);
        }
    }

    // update the job object
    async setUpdateForm(req, res) {

        try {
            const jobId = req.params.id;
            let job = await this.jobRepository.getJobById(jobId);
            if (job.recruiterEmail === req.session.userEmail) {
                await this.jobRepository.updateJob(jobId, req.body);
                res.redirect(`/job/${jobId}`);
            } else {
                const errMessage = 'You are not the recruiter of this Job, You are not authorized to update this job'
                res.render('error', { errMessage })
            }


        } catch (error) {
            console.log(error);
        }
    }

    // remove the job object
    async removeJob(req, res) {
        try {

            const jobId = req.params.id;
            let job = await this.jobRepository.getJobById(jobId);
            if (job.recruiterEmail === req.session.userEmail) {
                await this.jobRepository.deleteJob(jobId);
                res.redirect(`/getjobs`);
            } else {
                const errMessage = 'You are not the recruiter of this Job, You are not authorized to delete this job'
                res.render('error', { errMessage })
            }

        } catch (error) {
            console.log(error);
        }
    }

    // searches for the job with query
    async searchJobs(req, res) {
        try {

            const query = req.query.query.toLowerCase();
            const jobs = await this.jobRepository.get();
            const filteredJobs = jobs.filter(job => job.companyName.toLowerCase().includes(query));
            res.render('jobs', { jobs: filteredJobs });
        } catch (error) {
            console.log(error);
        }
    }
}

