import express from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
  changeContactNameController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', jsonParser, ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.put(
  '/contacts/:contactId',
  jsonParser,
  ctrlWrapper(updateContactController),
);
router.patch(
  '/contacts/:contactId/name',
  jsonParser,
  ctrlWrapper(changeContactNameController),
);

export default router;
