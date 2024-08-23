import express from 'express';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema } from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { refreshUserSessionController } from '../controllers/auth.js';

const authRoutes = Router();
const jsonParser = express.json();

authRoutes.post(
  '/auth/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRoutes.post(
  '/auth/login',
  jsonParser,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRoutes.post('/auth/logout', ctrlWrapper(logoutUserController));

authRoutes.post('/auth/refresh', ctrlWrapper(refreshUserSessionController));

export default authRoutes;
