import mongoose from "mongoose";
const url = "mongodb+srv://yashnd20comp:2TeWE1Y5ItB5Ol0m@atlas.eytsn.mongodb.net/HireHub";
export const connectUsingMongoose = async()=>{
    try{
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongodb connected using mongoose");
    }catch(err){
        console.log("Error while connecting to db");
        console.log(err);
    }
}