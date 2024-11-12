import mongoose from "mongoose";
import userSchema from "../schema/user.schema.js";
const Model = mongoose.model('user', userSchema)
export default class UserModel {

    async addUser(user) {
        try {
            let newUser = new Model({ name: user.name, email: user.email, password: user.password });
            let savedUser = await newUser.save()
        } catch (error) {
            console.log(error);
        }
    }

    async checkUser(user) {
        try {    
            const isUser= await Model.findOne({email: user.email, password: user.password})
            return isUser;
        } catch (error) {
            console.log(error);
        }
    }
}
