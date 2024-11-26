import express from 'express';
import userRouter from './controllers/users.js';
import resumesRouter from './controllers/resumes.js';


var router = express.Router();
router.use('/user', userRouter);
router.use('/resume', resumesRouter);

export default router;