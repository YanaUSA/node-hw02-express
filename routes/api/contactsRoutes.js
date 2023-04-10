const express = require("express");
const router = express.Router();
// const { Types } = require("mongoose");
// const Contact = require("../../models/contactsModel");

const {
  postContactValidation,
  putContactValidation,
  updateStatusContactValidation,
  queryValidation,
} = require("../../middlewares/contactsValidationMiddleware");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getContacts,
  getContactOnId,
  postContact,
  deleteContact,
  putContact,
  patchStatusContact,
} = require("../../controllers/contactsControllers");
const { protectedRoutMiddleware } = require("../../middlewares/authMiddleware");

const { checkIfIdExist } = require("../../middlewares/checkIfIdExist");

router.use(asyncWrapper(protectedRoutMiddleware));

router.use("/:id", asyncWrapper(checkIfIdExist));

router.get("/", queryValidation, asyncWrapper(getContacts));

router.get("/:id", asyncWrapper(getContactOnId));

router.post("/", postContactValidation, asyncWrapper(postContact));

router.delete("/:id", asyncWrapper(deleteContact));

router.put("/:id", putContactValidation, asyncWrapper(putContact));

router.patch(
  "/:id/favorite",
  updateStatusContactValidation,
  asyncWrapper(patchStatusContact)
);

module.exports = router;
