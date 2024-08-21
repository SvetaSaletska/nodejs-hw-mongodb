import express from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();

const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdController));
router.post(
  '/contacts',
  jsonParser,
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);
router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactController));
router.put(
  '/contacts/:id',
  isValidId,
  jsonParser,
  validateBody(createContactsSchema),
  ctrlWrapper(updateContactController),
);
router.patch(
  '/contacts/:id',
  isValidId,
  jsonParser,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

export default router;
