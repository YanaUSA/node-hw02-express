const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../utils/contactsUtils");

const getContacts = async (req, res, next) => {
  const { page, limit, favorite } = req.query;
  const { _id: owner } = req.user;

  const data = await listContacts(owner, page, limit, favorite);

  res.status(200).json(data);
};

const getContactOnId = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id: contactId } = req.params;

  const contactById = await getContactById(owner, contactId);

  if (!contactById) {
    res.status(200).json(`This user doesn't have contact with ID ${contactId}`);
  }

  res.status(200).json(contactById);
};

const postContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const newContact = await addContact(owner, req.body);

  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const deletedContact = await removeContact(owner, id);

  if (!deletedContact) {
    res.status(200).json(`This user doesn't have contact with ID ${id}`);
  }

  res.status(200).json({
    message: "contact deleted",
  });
};

const putContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const contactUpdated = await updateContact(id, owner, req.body);

  if (!contactUpdated) {
    res.status(200).json(`This user doesn't have contact with ID ${id}`);
  }

  res.status(200).json(contactUpdated);
};

const patchStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const updatedStatus = await updateStatusContact(id, owner, req.body);

  if (!updatedStatus) {
    res.status(200).json(`This user doesn't have contact with ID ${id}`);
  }

  res.status(200).json(updatedStatus);
};

module.exports = {
  getContacts,
  getContactOnId,
  postContact,
  deleteContact,
  putContact,
  patchStatusContact,
};
