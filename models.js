import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
let models = {}



try {
    console.log(process.env.CONNECTION_STRING);
    await mongoose.connect(process.env.CONNECTION_STRING)
    const userSchema = new mongoose.Schema({
        username: String,
        firstName: String,
        lastName: String,
        email: String,
        jobTitle: String,
        skills: [String],
        jobInterest: [String],
    })
    
    const resumeSchema = new mongoose.Schema({
        resume: String,
        job_description: String,
        filtered_user_skills: String,
        username: String,
        llm_response: String
    }, { timestamps: true });
    
    const simpleReviewSchema = new mongoose.Schema({
        username: String,
        resumeName: String,
        resume: String,
        output: String,
        favorited: { type: Boolean, default: false },
        resumeReviewName: String
    }, {timestamps:true});
    
    const specificReviewSchema = new mongoose.Schema({
        username: String,
        resumeName: String,
        resume: String,
        specificJobs: [String],
        output: String,
        favorited: { type: Boolean, default: false },
        resumeReviewName: String
    }, {timestamps:true});

    const jobReviewSchema = new mongoose.Schema({
        username: String,
        selectedResume: String,
        selectedJobType: String,
        selectedSkills: [String],
        jobReviewOutput: String,
        jobReviewName: String,

    }, {timestamps:true});

    const plainResumeSchema = new mongoose.Schema({
        username: String,
        resumeName: String,
        favorited: { type: Boolean, default: false },
        resume: String
    }, {timestamps:true});

    
    
    
    models.User = mongoose.model('User', userSchema);
    models.Resume = mongoose.model('Resume', resumeSchema);
    models.simpleReview = mongoose.model('SimpleReview', simpleReviewSchema);
    models.SpecifcReview = mongoose.model('SpecificReview', specificReviewSchema);
    models.JobReview = mongoose.model('JobReview', jobReviewSchema);
    models.PlainResume = mongoose.model('PlainResume', plainResumeSchema);
    
} catch (error) {
    console.log(error);
}
export default models;