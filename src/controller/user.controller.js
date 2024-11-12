import UserModel from "../models/user.model.js";
import JobModel from "../models/jobs.model.js";


export default class UserController{
    
    constructor(){
        this.userRepository = new UserModel();
        this.jobRepository = new JobModel();
    }
    // Renders Landing page
    getPage(req,res){
        res.render('landingPage')
    }

    // Post registration details
   async setRegister(req,res,next){
       try {    
            let user = req.body;
            await this.userRepository.addUser(user)
            next();
        } catch (error) {
            console.log(error);
        }
    }
    // renders login page
    getLogin(req,res){
        res.render('login')
    }

    // posts login details
   async setLogin(req,res){
        let user = req.body;
        let email = user.email;
        let isValid = this.userRepository.checkUser(user);
        if(isValid){
            req.session.userEmail = email;
            let jobs = await this.jobRepository.get();
            res.render('jobs',{jobs})
        }else{
            res.send('Wrong Credintiails') 
        }
        try {    
        } catch (error) {
            console.log(error);
        }
    }

    
    logout(req,res){
        if(req.session.userEmail){
            req.session.destroy((err)=>{
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/')
                }
            })
        }else{
            res.send('You are not Logged in as recruter')
        }
    }
}
