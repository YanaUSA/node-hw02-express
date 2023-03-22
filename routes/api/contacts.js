const express = require("express");
const router = express.Router();

const {
  postContactValidation,
  putContactValidation,
  updateStatusContactValidation,
} = require("../../middlewares/validationMiddleware");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getContacts,
  getContactOnId,
  postContact,
  deleteContact,
  putContact,
  patchStatusContact,
} = require("../../controllers/contactsControllers");

router.get("/", asyncWrapper(getContacts));

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
