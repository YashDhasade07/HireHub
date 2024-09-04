export default class JobModel {
    constructor(id, category, designation, location, companyName, salary, applyBy, skills, openings, jobPosted, applicants,recruiterEmail) {
        this.id = id;
        this.category = category;
        this.designation = designation;
        this.location = location;
        this.companyName = companyName;
        this.salary = salary;
        this.applyBy = applyBy;
        this.skills = skills || []; // Initialize skills array
        
        this.openings = openings;
        this.jobPosted = jobPosted;
        this.applicants = applicants || []; // Initialize applicants array
        this.recruiterEmail = recruiterEmail;
    }

    static get() {
        return jobs;
    }

    static addJob(job,recruiterEmail) {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const skillsArray = Array.isArray(job.skills_required) ? job.skills_required : [job.skills_required];
        let newJob = new JobModel(
            jobs.length + 1,
            job.job_category,
            job.job_designation,
            job.job_location,
            job.company_name,
            job.salary,
            job.apply_by,
            // job.skills_required,
            skillsArray,
            job.number_of_openings,
            `${year}-${month}-${day}`,
            [],
            recruiterEmail

        )
        jobs.push(newJob);
    }

    static getJobById(id) {
        const result = jobs.find((u) => u.id == id);
        return result;
    }

    static updateJob(id,newJob){
        const skillsArray = Array.isArray(newJob.skills_required) ? newJob.skills_required : [newJob.skills_required];
            jobs.forEach((job)=>{
            if(job.id == id){
            job.category = newJob.job_category,
            job.designation = newJob.job_designation,
            job.location = newJob.job_location,
            job.companyName = newJob.company_name,
            job.salary = newJob.salary,
            job.applyBy = newJob.apply_by,
            // job.skills = newJob.skills_required ,
            job.skills = skillsArray,
            job.openings = newJob.number_of_openings
            
            }
        })      
    }

    static deleteJob(id){
        
        for(let i =0; i< jobs.length; i++){

            if(jobs[i].id==id){
                jobs.splice(i,1);
                return;
            }
        }
        
    }

    static applicantList(id){
        for(let i =0; i< jobs.length; i++){

            if(jobs[i].id==id){
                return jobs[i].applicants
            }
        }
        
        return;
    }
}

export let jobs = [
    new JobModel(
        1,
        'Tech',
        'SDE',
        'Mumbai',
        'Stark Industries',
        '20LPA',
        '2024-12-5',
        ['NodeJs', 'NodeJs', 'ReactJs'],
        23,
        `2024-08-31`,
        []

    ),
    new JobModel(
        2,
        'Tech',
        'SDE',
        'Delhi',
        'Wane Industries',
        '33LPA',
        '2024-12-5',
        ['NodeJs', 'ReactJs','Angular'],
        23,
        `2024-08-31`,
        []

    )
];
