import { jobs } from "./jobs.model.js";

export default class ApplicantModel{
    constructor(id,name,email,contact,resumePath){
        this.id = id,
        this.name = name,
        this.email = email,
        this.contact = contact,
        this.resumePath = resumePath
    }

    static addApplicant(name,email,cotact,filePath,id){
        let applicant = new ApplicantModel(
            applicants.length+1,name,email,cotact,filePath
        )
        applicants.push(applicant);
        // console.log(applicant);

        jobs.forEach((job)=>{
            if(job.id==id){
                job.applicants.push(applicant)
            }
        })

        // console.log(jobs);
    }
}

let applicants=[];