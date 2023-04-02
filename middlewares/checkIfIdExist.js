const { Types } = require("mongoose");
const Contact = require("../models/contactsModel");

const checkIfIdExist = async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) {
    return res.status(404).json({ message: "Not found" });
  }

  // const idExists = await Contact.findById(id);

  const idExists = await Contact.exists({ _id: id });

  if (!idExists) {
    return res.status(404).json({ message: "Not found" });
  }

  next();
};

module.exports = {
  checkIfIdExist,
};
