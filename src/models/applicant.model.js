import applicantSchema from "../schema/applicant.schema.js";
import jobSchema from "../schema/jobs.schema.js";
import mongoose from "mongoose";
let JobModel = mongoose.model('job', jobSchema)
let Model = mongoose.model("applicant", applicantSchema)

export default class ApplicantModel {

    async addApplicant(name, email, contact, filePath, id) {
        try {
            
            let applicant = new Model({ name: name, email: email, contact: contact, resumePath: filePath })
            const savedApplicant = await applicant.save();
            await JobModel.findByIdAndUpdate(
                id,
                { $push: { applicants: savedApplicant } },
                { new: true }
            );
        } catch (error) {
            console.log(error);
        }

    }
}
