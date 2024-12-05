import express from 'express';
import userRouter from './controllers/user.js';
import resumesRouter from './controllers/resumes.js';


var router = express.Router();
router.use('/user', userRouter);
router.use('/resumes', resumesRouter);

export default router;