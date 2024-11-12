import mongoose from "mongoose";
import jobSchema from "../schema/jobs.schema.js";
const Model = mongoose.model('job', jobSchema)
export default class JobModel {

    async get() {
        try {
            let jobs = await Model.find({});
            return jobs;
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    } 

    
    async addJob(job, recruiterEmail) {
        try {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            const skillsArray = Array.isArray(job.skills_required) ? job.skills_required : [job.skills_required];

            let newJob = new Model({
                category: job.job_category,
                designation: job.job_designation,
                location: job.job_location,
                companyName: job.company_name,
                salary: job.salary,
                applyBy: job.apply_by,
                skills: skillsArray,
                openings: job.number_of_openings,
                jobPosted: `${year}-${month}-${day}`,
                // applicants: [{ type: String }],
                recruiterEmail: recruiterEmail
            })

            await newJob.save();
        } catch (error) {
            console.log(error);
        }
    }

    async getJobById(id) {
        try {
            const result = await Model.findById(id)
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async updateJob(id, newJob) {
        try {
            const skillsArray = Array.isArray(newJob.skills_required) ? newJob.skills_required : [newJob.skills_required];
            let job = await Model.findById(id);
            job.category = newJob.job_category,
                job.designation = newJob.job_designation,
                job.location = newJob.job_location,
                job.companyName = newJob.company_name,
                job.salary = newJob.salary,
                job.applyBy = newJob.apply_by,
                job.skills = skillsArray,
                job.openings = newJob.number_of_openings

            await job.save();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteJob(id) {
        try {
            await Model.deleteOne({ _id: id })
            return;
        } catch (error) {
            console.log(error);
        }
    }

    async applicantList(id) {
        try {
            let job = await Model.findById(id) 
            return job.applicants
        } catch (error) {
            console.log(object);
        }
    }
}
