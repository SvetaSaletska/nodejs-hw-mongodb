import { contactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await contactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (user) => {
  const contact = await contactsCollection.create(user);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await contactsCollection.findByIdAndDelete(contactId);
  return contact;
};
