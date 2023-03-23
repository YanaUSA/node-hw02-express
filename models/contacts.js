const Contact = require("./contactsModel");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (id) => {
  try {
    const contactById = await Contact.findById(id);
    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (id) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (id, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updatedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateStatusContact = async (id, body) => {
  try {
    const updatedStatusContact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });

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
