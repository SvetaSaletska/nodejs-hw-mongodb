import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  changeContactName,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const createdNewContact = await createContact(contact);

  res
    .status(201)
    .send({ status: 201, message: 'Contact created', data: createdNewContact });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = deleteContact(contactId);

  if (result === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.send({ status: 200, message: 'Contact deleted', data: result });
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const result = await updateContact(contactId, contact);

  if (result === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res
    .status(200)
    .send({ status: 200, message: 'Contact updated', data: result });
};

export const changeContactNameController = async (req, res, next) => {
  const { contactId } = req.params;

  const name = req.body.name;

  const result = await changeContactName(contactId, name);

  console.log({ result });

  res.send('Name');
};
