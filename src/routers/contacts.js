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
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = express.Router();

const jsonParser = express.json();

router.get('/contacts', authenticate, ctrlWrapper(getAllContactsController));
router.get(
  '/contacts/:contactId',
  authenticate,
  checkRoles(ROLES.AUTOR),
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/contacts',
  authenticate,
  jsonParser,
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/contacts/:contactId',
  authenticate,
  isValidId,
  checkRoles(ROLES.AUTOR),
  ctrlWrapper(deleteContactController),
);
router.put(
  '/contacts/:contactId',
  authenticate,
  isValidId,
  jsonParser,
  validateBody(createContactsSchema),
  ctrlWrapper(updateContactController),
);
router.patch(
  '/contacts/:contactId',
  authenticate,
  checkRoles(ROLES.AUTOR),
  isValidId,
  jsonParser,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

export default router;
