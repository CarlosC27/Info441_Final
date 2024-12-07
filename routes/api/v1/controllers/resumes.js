import express from 'express';
import models from '../../../../models.js';
import axios from 'axios';
var router = express.Router();

router.post('/upload_resume', async function(req, res, next) {
    let session = req.session;
    if (req.session.isAuthenticated) {
        try {
            const { resume, job_description, username, filtered_user_skills } = req.body;
            const apiKey = process.env.PERPLEXITY_API_KEY; 
            const apiUrl = "https://api.perplexity.ai/chat/completions";

            const messages = [
                {
                    role: "system",
                    content: "You are an AI assistant that helps to improve and tailor resumes for job applications. Modify the given resume to highlight skills mentioned in the job description. Return only the modified resume content."
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

            const modifiedResumeText = response.data.choices[0].message.content;

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
        const user = await models.User.find({ username: username});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const latestResume = await models.Resume.find({ username: username })
            .sort({ createdAt: -1 })
        res.send(latestResume);
    } catch (error) {
        console.log(error);
        res.send({ "status": "error", "error": error });
    }
})

router.get('/past_resumes', async(req, res) => {
    let resumes;
    if (req.session.isAuthenticated) {
        // Find resume by specific user
        resumes = await req.models.PlainResume.find({ username: req.session.account.username });
    } else {
        return res.status(404).json({ message: 'User not found' });
    }

    let resumeData = await Promise.all(
        resumes.map(async resume => { 
            try {
                return ({ 
                    _id: resume._id,
                    username: resume.username,
                    resumeName: resume.resumeName,
                    favorited: resume.favorited,
                    resume: resume.resume,
                    createdAt: resume.createdAt
                });
            } catch(error){
                console.log(error)
                res.send(500).json({"status": "error", "error": error})
            }
        })
    );
    res.json(resumeData);
})

router.get('/past_simple_reviews', async(req, res) => {
    let reviews;
    if (req.session.isAuthenticated) {
        // Find reviews by specific user
        reviews = await req.models.simpleReview.find({ username: req.session.account.username });
    } else {
        return res.status(404).json({ message: 'User not found' });
    }

    let reviewData = await Promise.all(
        reviews.map(async review => { 
            try {
                return ({ 
                    _id: review._id,
                    username: review.username,
                    resumeName: review.resumeName,
                    resume: review.resume,
                    output: review.output,
                    favorited: review.favorited,
                    resumeReviewName: review.resumeReviewName,
                    createdAt: review.createdAt
                });
            } catch(error){
                console.log(error)
                res.send(500).json({"status": "error", "error": error})
            }
        })
    );
    res.json(reviewData);
})

router.get('/past_specific_reviews', async(req, res) => {
    let reviews;
    if (req.session.isAuthenticated) {
        // Find reviews by specific user
        reviews = await req.models.SpecifcReview.find({ username: req.session.account.username });
        console.log("hi")
        console.log(reviews)
    } else {
        return res.status(404).json({ message: 'User not found' });
    }

    let reviewData = await Promise.all(
        reviews.map(async review => { 
            try {
                return ({ 
                    _id: review._id,
                    username: review.username,
                    resumeName: review.resumeName,
                    resume: review.resume,
                    specificJobs: review.specificJobs,
                    output: review.output,
                    favorited: review.favorited,
                    resumeReviewName: review.resumeReviewName,
                    createdAt: review.createdAt
                });
            } catch(error){
                console.log(error)
                res.send(500).json({"status": "error", "error": error})
            }
        })
    );
    res.json(reviewData);
})

router.get('/past_job_reviews', async(req, res) => {
    let reviews;
    if (req.session.isAuthenticated) {
        // Find reviews by specific user
        reviews = await req.models.JobReview.find({ username: req.session.account.username });
    } else {
        return res.status(404).json({ message: 'User not found' });
    }

    let reviewData = await Promise.all(
        reviews.map(async review => { 
            try {
                return ({ 
                    _id: review._id,
                    username: review.username,
                    selectedResumeName: review.selectedResumeName,
                    selectedResume: review.selectedResume,
                    selectedJobType: review.selectedJobType,
                    selectedSkills: review.selectedSkills,
                    jobReviewOutput: review.jobReviewOutput,
                    jobReviewName: review.jobReviewName,
                    createdAt: review.createdAt
                });
            } catch(error){
                console.log(error)
                res.send(500).json({"status": "error", "error": error})
            }
        })
    );
    res.json(reviewData);
})

router.post('/simple', async (req, res) => {
    try {
        const { username, resumeName, resume, resumeReviewName, favorited, output } = req.body;

        if (!username || !resumeName || !resume || !resumeReviewName) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        const newReview = new models.simpleReview({
            username,
            resumeName,
            resume,
            resumeReviewName,
            favorited: favorited || false,
            output,
        });

        const savedReview = await newReview.save();

        const plainResume = new models.PlainResume({
            username,
            resumeName,
            favorited: favorited || false,
            resume,
        });

        await plainResume.save();

        res.status(201).json({ message: 'Simple review and plain resume saved successfully', id: savedReview._id });
    } catch (error) {
        console.error('Error saving simple review and plain resume:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/specific', async (req, res) => {
    try {
        const { username, resumeName, resume, resumeReviewName, favorited, output, specificJobs } = req.body;

        if (!username || !resumeName || !resume || !resumeReviewName || !specificJobs || specificJobs.length === 0) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        const newReview = new models.SpecifcReview({
            username,
            resumeName,
            resume,
            resumeReviewName,
            favorited: favorited || false,
            output,
            specificJobs,
        });

        const savedReview = await newReview.save();

        const plainResume = new models.PlainResume({
            username,
            resumeName,
            favorited: favorited || false,
            resume,
        });

        await plainResume.save();

        res.status(201).json({ message: 'Specific review and plain resume saved successfully', id: savedReview._id });
    } catch (error) {
        console.error('Error saving specific review and plain resume:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/resumesList', async (req, res) => {
    if (!req.session || !req.session.isAuthenticated) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    const { username } = req.session.account || {};
    if (!username) {
        return res.status(401).json({ message: 'Unauthorized. Username is missing.' });
    }

    try {
        const resumes = await models.PlainResume.find({ username });
        if (!resumes || resumes.length === 0) {
            return res.status(404).json({ message: 'No resumes found for this user.' });
        }

        res.status(200).json(resumes); // Return full objects
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/jobReview', async (req, res) => {
    try {
        const { username, selectedResumeName, selectedResume, selectedJobType, selectedSkills, jobReviewOutput, jobReviewName } = req.body;

        if (!username || !selectedResumeName || !selectedResume || !selectedJobType || !jobReviewName || selectedSkills.length === 0) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        const newJobReview = new models.JobReview({
            username,
            selectedResumeName,
            selectedResume,
            selectedJobType,
            selectedSkills,
            jobReviewOutput, 
            jobReviewName,
        });

        const savedJobReview = await newJobReview.save();

        res.status(201).json({
            message: 'Job review saved successfully',
            id: savedJobReview._id,
        });
    } catch (error) {
        console.error('Error saving job review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;