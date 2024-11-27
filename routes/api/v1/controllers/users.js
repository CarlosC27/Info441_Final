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
                email: req.email,
                jobTitle: req.jobTitle
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
        const sessionUsername = req.session.account?.username; // Extract username from session
        if (!sessionUsername) {
            return res.status(401).json({ error: 'Not logged in' });
        }
        res.json({ username: sessionUsername }); // Return username
    } catch (error) {
        console.error('Error in /profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/myIdentity', (req, res) => {
    console.log("Session Data:", req.session);
    if (req.session.isAuthenticated) {
        res.json({
            status: "loggedin",
            userInfo: {
                name: req.session.account?.name,
                username: req.session.account?.username,
            },
        });
    } else {
        res.json({ status: "loggedout" });
    }
});






export default router;