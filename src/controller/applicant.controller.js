import JobModel from "../models/jobs.model.js";
export default class ApplicantController{
    constructor() {
        this.jobRepository = new JobModel();
    }
    // Displays Applicant List
   async getApplicantList(req,res){
       try {    
            const jobId = req.params.id;
            let job =await this.jobRepository.getJobById(jobId);
            if (job.recruiterEmail === req.session.userEmail) {
                let applicant =await this.jobRepository.applicantList(jobId);
                console.log(applicant);
                res.render('applicantList', { applicant });
            } else {
                const errMessage = 'You are not the recruiter of this Job, You are not authorized to view applicants for this job'
                res.render('error', { errMessage })
            }
        } catch (error) {
            console.log(error);
        }
    }
}