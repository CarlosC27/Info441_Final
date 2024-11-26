import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
let models = {}

try {
    console.log(process.env.CONNECTION_STRING);
    await mongoose.connect(process.env.CONNECTION_STRING)
    const userSchema = new mongoose.Schema({
        skills: [String],
        job_interests: [String],
        username: String,
        email: String
    })
    models.User = mongoose.model('User', userSchema);

    const resumeSchema = new mongoose.Schema({
        resume: String,
        job_description: String,
        filtered_user_skills: String,
        username: String,
        llm_response: String
    }, { timestamps: true });
    models.Resume = mongoose.model('Resume', resumeSchema);
} catch (error) {
    console.log(error);
}
export default models;