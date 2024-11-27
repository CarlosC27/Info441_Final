import express from 'express';
import models from '../../../../models.js';
import axios from 'axios';
var router = express.Router();

router.post('/upload_resume', async function(req, res, next) {
    let session = req.session;
    // change this to session.authenticated later
    if (true) {
        try {
            // let user = req.session.account.username;
            const { resume, job_description, username, filtered_user_skills } = req.body;
            const apiKey = process.env.PERPLEXITY_API_KEY; 
            const apiUrl = "https://api.perplexity.ai/v1/chat/completions";

            const messages = [
                {
                    role: "system",
                    content: "You are an AI assistant that helps to improve and tailor resumes for job applications. Please provide suggestions to enhance the resume based on the provided job description and skills."
                },
                {
                    role: "user",
                    content: `Here is the resume content: ${resume} 
                    Here is the job description: ${job_description} 
                    Here are the filtered skills: ${filtered_user_skills}`
                }
            ];

            const response = await axios.post(apiUrl, {
                model: "llama-3.1-sonar-large-128k-online",
                messages: messages,
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Modified Resume:', response.data);

            const modifiedResumeText = response.data.text;

            const newResume = new models.Resume({
                resume: resume,
                job_description: job_description,
                username: username,
                filtered_user_skills: filtered_user_skills,
                llm_response: modifiedResumeText
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
        let username = req.body.username;
        console.log("username is " + username);
        const user = await models.User.find({ username: username});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const latestResume = await models.Resume.find({ username: username })
            .sort({ createdAt: -1 })
        console.log("latest resume is " + latestResume);
        res.send(latestResume);
    } catch (error) {
        console.log(error);
        res.send({ "status": "error", "error": error });
    }
})

export default router;