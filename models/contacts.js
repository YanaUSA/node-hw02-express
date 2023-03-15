const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid").v4;

const contactsPath = path.resolve("./models/contacts.json");

const getParsedPath = async (filePath) => {
  const readFile = await fs.readFile(filePath);
  return JSON.parse(readFile);
};

const listContacts = async () => {
  try {
    const contactsDB = await getParsedPath(contactsPath);

    return contactsDB;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getParsedPath(contactsPath);

    return contacts.find((el) => el.id === contactId);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsDB = await getParsedPath(contactsPath);

    const hasIdToDeleted = contactsDB.find((el) => el.id === contactId);

    const deletedContact = contactsDB.filter(
      (el) => el.id !== hasIdToDeleted.id
    );

    await fs.writeFile(contactsPath, JSON.stringify(deletedContact));

    return hasIdToDeleted;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;

    const contactsDB = await getParsedPath(contactsPath);

    const newContact = {
      id: uuid(),
      name,
      email,
      phone,
    };

    contactsDB.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsDB));

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const contactsDB = await getParsedPath(contactsPath);

  contactsDB.forEach((el) => {
    if (el.id === contactId) {
      if (name) {
        el.name = name;
      }
      if (email) {
        el.email = email;
      }
      if (phone) {
        el.phone = phone;
      }
    }
  });

  await fs.writeFile(contactsPath, JSON.stringify(contactsDB));

  const hasContactToUpdate = contactsDB.find((el) => el.id === contactId);

  const updatedContact = contactsDB.find(
    (el) => el.id === hasContactToUpdate.id
  );

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
