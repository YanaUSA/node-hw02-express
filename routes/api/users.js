const express = require("express");
const router = express.Router();

const {
  postUserValidation,
} = require("../../middlewares/usersValidationMiddleware");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  postUser,
  postLoggedUser,
} = require("../../controllers/usersControllers");

router.post("/register", postUserValidation, asyncWrapper(postUser));

router.post("/login", postUserValidation, asyncWrapper(postLoggedUser));

module.exports = router;
