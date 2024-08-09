import express from 'express';
import {
  getContacts,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/controllerContacts.js';
import { wrapper } from '../utils/wrapper.js';

export const router = express.Router();

router.get('/', wrapper(getContacts));
router.get('/:contactId', wrapper(getContactByIdController));
router.post('/', wrapper(createContactController));
router.patch('/:contactId', wrapperrapper(updateContactController));
router.delete('/:contactId', wrapper(deleteContactController));
