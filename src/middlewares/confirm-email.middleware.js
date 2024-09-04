// Email confirmaion middleware
import nodemailer from 'nodemailer';

export const confirmEmail = (req, res, next) => {
    
    const {name,email}= req.body;
    async function sendMail(){

        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'yashdhasade01@gmail.com',
                // pass:'icafjdqakedebmgm'
                pass:'xkdrqvrznntsjues'
            }
        });
        
        //2. Configure email content
        const mailOptions = {
            // from: 'cnsender@gmail.com',
            from: 'yashdhasade01@gmail.com',
            to: email,
            subject: 'Job Application Confirmation',
            text: `Dear ${name},Thank you for applying to a job at HireHub. \nWe have received your application and are currently reviewing it.\nIf your qualifications match our requirements, we will contact you for the next steps of the selection process.\nThank you for your interest in joining our team!\nBest regards,\nThe HireHub Team,`
        };
        
        // 3. Send the email
        try{
            const result = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        }catch(err){
            console.log('Email send failuer with error: '+ err);
        }
        }
        
        sendMail();

        next();
  };

