import express from 'express';
import userRouter from './controllers/user.js';
import resumesRouter from './controllers/resumes.js';
import perplexityRouteRouter from './controllers/perplexityRoute.js';


var router = express.Router();
router.use('/user', userRouter);
router.use('/resumes', resumesRouter);
router.use('/perplexity', perplexityRouteRouter);

export default router;