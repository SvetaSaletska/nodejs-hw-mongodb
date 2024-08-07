import Contact from '../models/contact.js';

export const getAllContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (error) {
    console.error('Error while fetching contacts:', error);
    throw error;
  }
};

export const getContactById = async (contactId) => {
  try {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
  } catch (error) {
    console.error(`Error while fetching contact with id ${contactId}:`, error);
    throw error;
  }
};

export const createContact = async (contactData) => {
  try {
    const newContact = new Contact(contactData);
    await newContact.save();
    return newContact;
  } catch (error) {
    console.error('Error while creating a new contact:', error);
    throw error;
  }
};

export const updateContact = async (contactId, contactData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      contactData,
      { new: true },
    );
    return updatedContact;
  } catch (error) {
    console.error(`Error while updating contact with id ${contactId}:`, error);
    throw error;
  }
};

export const deleteContact = async (contactId) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    return deletedContact;
  } catch (error) {
    console.error(`Error while deleting contact with id ${contactId}:`, error);
    throw error;
  }
};
