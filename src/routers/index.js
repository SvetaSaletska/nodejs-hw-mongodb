import { Router } from 'express';
import router from './contacts.js';
import authRouter from './auth.js';

const generalRouter = Router();

generalRouter.use('/contacts', router);
generalRouter.use('/auth', authRouter);

export default generalRouter;
