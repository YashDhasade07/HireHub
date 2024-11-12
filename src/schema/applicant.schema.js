import mongoose from "mongoose";

let applicantSchema = mongoose.Schema({
        name :{type: String},
        email : {type: String},
        contact : {type: String},
        resumePath : {type: String}
})

export default applicantSchema;