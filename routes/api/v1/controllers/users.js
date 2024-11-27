import express from 'express';
import models from '../../../../models.js';
var router = express.Router();

router.post('/', async function(req, res, next) {
    let session = req.session;
    if (session.isAuthenticated) {
        try {
            const newUser = new models.User({
                skills: req.body.skills,
                job_interests: req.body.job_interests,
                username: session.account.username,
                firstName: session.account.name,
                lastName: req.body.lastName,
                email: req.body.email,
                jobTitle: req.body.jobTitle
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
        const sessionUsername = req.session.account?.username;
        const sessionName = req.session.account?.name // Extract username from session
        if (!sessionUsername) {
            return res.status(401).json({ error: 'Not logged in' });
        }
        res.json({ username: sessionUsername,
            firstName:sessionName
         });
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

// edit profile endpoints

// Update User Name
router.post('/updateName', async function (req, res, next) {
    const session = req.session;

    if (session.isAuthenticated) {
        try {
            const { firstName, lastName } = req.body;
            if (!firstName || !lastName) {
                return res.status(400).json({ error: 'First and Last Name are required' });
            }
            const user = await models.User.findOneAndUpdate(
                { username: session.account.username }, 
                { firstName, lastName }, 
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ status: 'success', user });
        } catch (error) {
            console.error('Error updating name:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(401).json({ error: 'Not logged in' });
    }
});







export default router;