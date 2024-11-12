import mongoose from "mongoose";

let jobSchema = mongoose.Schema({
    category : {type: String},
    designation :{type: String},
    location :{type: String},
    companyName :{type: String},
    salary  :{type: String},
    applyBy :{type: String},
    skills :[{type: String}], 
    openings  :{type: Number},
    jobPosted :{type: String},
    applicants :[{type: Object}], 
    recruiterEmail :{type: String},
});

export default jobSchema;
