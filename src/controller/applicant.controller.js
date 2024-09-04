import JobModel from "../models/jobs.model.js";
export default class ApplicantController{

    // Displays Applicant List
    getApplicantList(req,res){
        const jobId = req.params.id;
        let job = JobModel.getJobById(jobId);
        if (job.recruiterEmail === req.session.userEmail) {
            let applicant = JobModel.applicantList(jobId);
            console.log(applicant);
            res.render('applicantList', { applicant });
        } else {
            const errMessage = 'You are not the recruiter of this Job, You are not authorized to view applicants for this job'
            res.render('error', { errMessage })
            // res.send('You are not authorized to view applicants for this job');
        }

    }
}