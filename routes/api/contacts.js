const express = require("express");
const router = express.Router();

const {
  postContactValidation,
  putContactValidation,
} = require("../../middlewares/validationMiddleware");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getContacts,
  getContactOnId,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/contactsControllers");

router.get("/", asyncWrapper(getContacts));

router.get("/:id", asyncWrapper(getContactOnId));

router.post("/", postContactValidation, asyncWrapper(postContact));

router.delete("/:id", asyncWrapper(deleteContact));

router.put("/:id", putContactValidation, asyncWrapper(putContact));

module.exports = router;
