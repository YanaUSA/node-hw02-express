const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const getContacts = async (req, res, next) => {
  const { page, limit, favorite } = req.query;

  const paginationPage = +page || 1;
  const paginationLimit = +limit || 20;
  const skip = (paginationPage - 1) * paginationLimit;

  const data = await listContacts(skip, paginationLimit, favorite);

  res.status(200).json(data);
};

const getContactOnId = async (req, res, next) => {
  const { id } = req.params;

  const contactById = await getContactById(id);
  res.status(200).json(contactById);
};

const postContact = async (req, res, next) => {
  const newContact = await addContact(req.body);

  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;

  await removeContact(id);

  res.status(200).json({
    message: "contact deleted",
  });
};

const putContact = async (req, res, next) => {
  const { id } = req.params;

  const contactUpdated = await updateContact(id, req.body);

  if (contactUpdated) {
    res.status(200).json(contactUpdated);
  }
};

const patchStatusContact = async (req, res, next) => {
  const { id } = req.params;

  const updatedStatus = await updateStatusContact(id, req.body);

  if (updatedStatus) {
    res.status(200).json(updatedStatus);
  }
};

module.exports = {
  getContacts,
  getContactOnId,
  postContact,
  deleteContact,
  putContact,
  patchStatusContact,
};
