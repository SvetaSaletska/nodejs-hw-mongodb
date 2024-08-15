import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts';
export const router = Router();

router.get('/contacts', getAllContactsController);

router.get('/contacts/:contactId', getContactByIdController);
