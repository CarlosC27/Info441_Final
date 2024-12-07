import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
var router = express.Router();

router.post('/analyze', async (req, res) => {
    try {
        const { message } = req.body;
        
        const options = {
            method: 'POST',
            headers: {
                Authorization: `${process.env.PERPLEXITY_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.1-sonar-large-128k-online",
                messages: [
                    {
                        role: "system",
                        content: "You are an AI assistant that helps to improve and tailor resumes for job applications. Please provide suggestions to enhance the resume based on the provided job type and and selected skills.Please be sure to provide resume enchancements in bullet points that are ATS friendly as well"
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        };

        const response = await fetch('https://api.perplexity.ai/chat/completions', options);
        
        if (!response.ok) {
            throw new Error('Perplexity API request failed');
        }

        const data = await response.json();
        res.json({ analysis: data.choices[0].message.content });
    } catch (error) {
        console.error('Error in Perplexity API:', error);
        res.status(500).json({ error: 'Failed to analyze resume' });
    }
});

router.post('/analyze-job', async (req, res) => {
    try {
        const { message } = req.body;
        
        const options = {
            method: 'POST',
            headers: {
                Authorization: `${process.env.PERPLEXITY_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.1-sonar-large-128k-online",
                messages: [
                    {
                        role: "system",
                        content: "You are an AI assistant that helps to improve and tailor resumes for job applications. Please provide suggestions to enhance the resume based on the provided job description, skills, and current resume. Please be sure to provide resume enchancements in bullet points that are ATS friendly as well"
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        };

        const response = await fetch('https://api.perplexity.ai/chat/completions', options);
        
        if (!response.ok) {
            throw new Error('Perplexity API request failed');
        }

        const data = await response.json();
        res.json({ analysis: data.choices[0].message.content });
    } catch (error) {
        console.error('Error in Perplexity API:', error);
        res.status(500).json({ error: 'Failed to analyze job application' });
    }
});

export default router;