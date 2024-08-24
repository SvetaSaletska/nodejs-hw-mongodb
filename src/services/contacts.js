import { contactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

// export const getAllContacts = async ({
//   page = 1,
//   perPage = 10,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = '_id',
//   filter = {},
//   userId,
// }) => {
//   const limit = perPage;
//   const skip = (page - 1) * perPage;

//   const contactQuery = contactsCollection.find();

//   if (filter.contactType) {
//     contactQuery.where('contactType').equals(filter.contactType);
//   }

//   if (filter.isFavourite !== undefined) {
//     contactQuery.where('isFavourite').equals(filter.isFavourite);
//   }

//   contactQuery.where('userId').equals(userId);

//   const [contactsCount, contacts] = await Promise.all([
//     contactsCollection.find().merge(contactQuery).countDocuments(),

//     contactQuery
//       .skip(skip)
//       .limit(limit)
//       .sort({ [sortBy]: sortOrder })
//       .exec(),
//   ]);

//   const paginationData = calculatePaginationData(contactsCount, perPage, page);

//   return {
//     data: contacts,
//     ...paginationData,
//   };
// };

// export const getContactById = async (contactId, userId) => {
//   const contact = await contactsCollection.findOne({
//     _id: contactId,
//     userId,
//   });
//   return contact;
// };

// export const createContact = async (user) => {
//   const contact = await contactsCollection.create(user);
//   return contact;
// };

// export const deleteContact = async (contactId, userId) => {
//   const contact = await contactsCollection.findByIdAndDelete({
//     _id: contactId,
//     userId,
//   });
//   return contact;
// };

// export const updateContact = async (
//   contactId,
//   userId,
//   payload,
//   options = {},
// ) => {
//   const rawResult = await contactsCollection.findOneAndUpdate(
//     { _id: contactId, userId },
//     payload,
//     {
//       new: true,
//       includeResultMetadata: true,
//       ...options,
//     },
//   );

//   if (!rawResult || !rawResult.value) return null;

//   return {
//     contact: rawResult.value,
//     isNew: Boolean(rawResult?.lastErrorObject?.upserted),
//   };
// };

const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter,
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsCollection.find();

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  contactsQuery.where('userId').equals(userId);

  const [contactsCount, contacts] = await Promise.all([
    contactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

function getContactById(contactId, userId) {
  return contactsCollection.findOne({ _id: contactId, userId });
}

function createContact(contact) {
  return contactsCollection.create(contact);
}

function deleteContact(contactId, userId) {
  return contactsCollection.findOneAndDelete({ _id: contactId, userId });
}

const patchContact = async (contactId, userId, payload, options) => {
  const rawResult = await contactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  console.log(rawResult._id);
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
};
