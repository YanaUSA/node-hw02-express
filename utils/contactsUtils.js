const Contact = require("../models/contactsModel");

const listContacts = async (owner, page, limit, favorite) => {
  try {
    const contactsQuery = favorite ? { owner, favorite } : { owner };

    const paginationPage = +page || 1;
    const paginationLimit = +limit || 20;
    const skip = (paginationPage - 1) * paginationLimit;

    const result = Contact.find(contactsQuery);

    result.skip(skip).limit(paginationLimit);

    const contacts = await result;

    // const total = await Contact.count();
    // const contactsPerPage = contacts.length;
    // const filteredContacts = await Contact.countDocuments(contactsQuery);
    // return { total, contactsPerPage, filteredContacts, contacts };

    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (owner, contactId) => {
  try {
    // const contactById = await Contact.findById(contactId);

    const contactById = await Contact.findOne({ _id: contactId, owner });

    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (owner, body) => {
  try {
    const newContact = await Contact.create({ ...body, owner });

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (owner, id) => {
  try {
    const deletedContact = await Contact.findOneAndDelete({ _id: id, owner });

    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, owner, body) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      body,
      {
        new: true,
      }
    );
    return updatedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateStatusContact = async (id, owner, body) => {
  try {
    const updatedStatusContact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      body,
      {
        new: true,
      }
    );

    return updatedStatusContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
