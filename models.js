// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();
// let models = {}
// await mongoose.connect('mongodb+srv://INFO441CACS:INFO441A1@info441.hyqcc.mongodb.net/Info441DB?retryWrites=true&w=majority&appName=INFO441');

// console.log("successfully connected to mongodb!");

// const userSchema = new mongoose.Schema({
//     skills: [String],
//     job_interests: [String],
//     username: String,
//     email: String,
//     currentJobRole: String,
// })

// const resumeSchema = new mongoose.Schema({
//     resume: String,
//     job_description: String,
//     filtered_user_skills: String,
//     username: String,
//     llm_response: String
// }, { timestamps: true });


// models.User = mongoose.model('User', userSchema);
// models.Resume = mongoose.model('Resume', resumeSchema);


// export default models;

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
        email: String,
        // jobTitle: String,
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