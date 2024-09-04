// User authentication middleware
const auth = (req, res, next) => {
    if (req.session.userEmail) {
        next();
    } else {
        // res.send('You need to be the Receruter to access this page')
        const errMessage = 'only recruiter is allowed to access this page, login as recruiter to continue'
        res.render('error', { errMessage })
    }
}

// this make sure that once logged in you dont get to view landing page but jobs page directly

export const auth2 = (req, res, next) => {
    if (req.session.userEmail) {
        res.redirect('/jobs')
    } else{
        next()
    }
}

export default auth;
