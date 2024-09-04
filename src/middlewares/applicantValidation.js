// MiddleWare for validating applicant Details
import {
    body,
    validationResult,
} from 'express-validator';

import JobModel from '../models/jobs.model.js';

const validateRequest = async (
    req,
    res,
    next
) => {
    // console.log(req.body);
    // 1. Setup rules for validation.
    const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('contact').isMobilePhone().withMessage('Invalid phone number'),
        body('resume').custom((value, { req }) => {
            if (!req.file) {
                throw new Error('pdf is required');
            }
            return true;
        }),
    ];

    // 2. run those rules.
    await Promise.all(
        rules.map((rule) => rule.run(req))
    );


    // 3. check if there are any errors after running the rules.
    var validationErrors = validationResult(req);
    console.log(validationErrors);
    let id = req.params.id;
    const job = JobModel.getJobById(id);
    // 4. if errros, return the error message
    if (!validationErrors.isEmpty()) {
        if (job) {
            return res.render('jobDetails', {
                job: job,
                errorMessage:
                validationErrors.array()[0].msg
            });
            
        }
    }
    next();
};

export default validateRequest;
