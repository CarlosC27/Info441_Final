import express from 'express';
import userRouter from './controllers/users.js';

var router = express.Router();
router.use('/user', userRouter);

export default router;