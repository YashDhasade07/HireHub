import UserModel from "../models/user.model.js";
import JobModel from "../models/jobs.model.js";

export default class UserController{
    // Renders Landing page
    getPage(req,res){
        res.render('landingPage')
    }

    // Post registration details
    setRegister(req,res,next){
        let user = req.body;
        // console.log(user);
        UserModel.addUser(user);
        
        next();
    }
    // renders login page
    getLogin(req,res){
        res.render('login')
    }

    // posts login details
    setLogin(req,res){
        let user = req.body;
        let email = user.email;
        let isValid = UserModel.checkUser(user);
        if(isValid){
            req.session.userEmail = email;
            let jobs = JobModel.get();
            res.render('jobs',{jobs})
        }else{
            res.send('Wrong Credintiails') 
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
