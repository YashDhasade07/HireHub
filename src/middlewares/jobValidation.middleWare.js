// MiddleWare for validating applicant Details

import { body, validationResult } from 'express-validator';
import JobModel from '../models/jobs.model.js';
// import JobModel from '../models/jobs.model.js';

const jobValidate = async (req, res, next) => {
    // Setup rules for validation
    const rules = [
        body('job_category').notEmpty().withMessage('Job category is required'),
        body('job_designation').notEmpty().withMessage('Job designation is required'),
        body('job_location').notEmpty().withMessage('Job location is required'),
        body('company_name').notEmpty().withMessage('Company name is required'),
        body('salary').notEmpty().withMessage('Salary is required'),
        body('number_of_openings')
            .notEmpty().withMessage('Number of openings is required')
            .isInt({ min: 1 }).withMessage('Number of openings must be a positive number'),
        body('skills_required').notEmpty().withMessage('At least one skill is required'),
        body('apply_by').notEmpty().withMessage('Apply by date is required'),
    ];

    // Run the validation rules
    await Promise.all(rules.map((rule) => rule.run(req)));

    // Check for validation errors
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        if (req.params.id) {
            const jobId = req.params.id;
            let job = JobModel.getJobById(jobId);
            return res.render('updateJobForm', {
                job: job,
                errorMessage: validationErrors.array()[0].msg,
            });
        } else {
            return res.render('newJobForm', {
                errorMessage: validationErrors.array()[0].msg,
            });
        }
    }

    // Proceed to the next middleware
    next();
};

export default jobValidate;
