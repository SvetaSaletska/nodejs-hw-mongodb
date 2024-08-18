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

export const updateContact = async (studentId, payload, options = {}) => {
  const rawResult = await contactsCollection.findOneAndUpdate(
    { _id: studentId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
