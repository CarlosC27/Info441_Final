import express from 'express';
import models from '../../../../models.js';
var router = express.Router();

router.post('/', async function(req, res, next) {
    let session = req.session;
    if (session.isAuthenticated) {
        try {
            const { skills, job_interests, email, jobTitle } = req.body;
            const newUser = new models.User({
                skills,
                job_interests,
                username: session.account.username,
                email,
                jobTitle,
            });
            await newUser.save();
            res.send({ "status": "success" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "status": "error", "error": error.message });
        }
    } else {
        res.status(401).send({ "status": "error", "error": "Not logged in" });
    }
});


router.get('/profile', async function (req, res, next) {
    let session = req.session;

    // Check if the user is authenticated
    if (!session || !session.isAuthenticated) {
        return res.status(401).json({ status: 'error', error: 'Not authenticated' });
    }

    try {
        const username = session.account.username; // Retrieve username from session
        const userProfile = await models.User.findOne({ username });
        if (!userProfile) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }
        res.status(200).json(userProfile); // Send the user profile
    } catch (error) {
        console.log('Error fetching user profile:', error);
        res.status(500).send({ status: 'error', error: error.message });
    }
});




router.get('/', async function(req, res, next) {
    try {
        const users = await models.User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ status: "error", error: error.message });
    }
});





export default router;