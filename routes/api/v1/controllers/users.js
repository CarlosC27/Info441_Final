import express from 'express';
import models from '../../../../models.js';
var router = express.Router();

router.post('/', async function(req, res, next) {
    let session = req.session;
    if (session.isAuthenticated) {
        try {
            const newUser = new models.User({
                skills: req.skills,
                job_interests: req.job_interests,
                username: session.account.username,
                email: req.email
            })
            await newUser.save()
            res.send({ "status": "success" });
        } catch (error) {
            console.log(error);
            res.send({ "status": "error", "error": error });
        }
    } else {
        res.send({ "status": "error", "error": "not logged in" });
    }
});

router.get('/profile', async function(req, res, next) {
    try {
        let query = {};
        query.username = req.query.userame;
        let userProfile = await models.User.find(query);
        res.send(userProfile);
    } catch (error) {
        console.log(error);
        res.send({ "status": "error", "error": error });
    }
})

export default router;