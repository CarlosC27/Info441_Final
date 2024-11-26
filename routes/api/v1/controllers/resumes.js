import express from 'express';
import models from '../../../../models.js';
var router = express.Router();

router.post('/upload_resume', async function(req, res, next) {
    let session = req.session;
    if (session.isAuthenticated) {
        try {
            let user = req.session.account.username;
            const { resume, job_description, filtered_user_skills } = req.body;
            const newResume = new models.Resume({
                resume: resume,
                job_description: job_description,
                user: user,
                llm_response: "hello from llm"
            })
            await newResume.save()
            res.send({ "status": "success" });
        } catch (error) {
            console.log(error);
            res.send({ "status": "error", "error": error });
        }
    } else {
        res.send({ "status": "error", "error": "not logged in" });
    }
});

router.get('/review_results', async function(req, res, next) {
    try {
        let username = req.session.account.username;
        const user = await models.User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const latestResume = await models.Resume.findOne({ user: user._id })
            .sort({ createdAt: -1 })
        res.send(latestResume.resume);
    } catch (error) {
        console.log(error);
        res.send({ "status": "error", "error": error });
    }
})

export default router;