const express = require("express");
const router = express.Router();

const {
  postUserValidation,
  postUserLoginValidation,
} = require("../../middlewares/usersValidationMiddleware");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  postUser,
  postLoggedUser,
  postLogoutUser,
  getCurrentUser,
  patchSubscription,
} = require("../../controllers/usersControllers");

const { protectedRoutMiddleware } = require("../../middlewares/authMiddleware");

router.post("/register", postUserValidation, asyncWrapper(postUser));

router.post("/login", postUserLoginValidation, asyncWrapper(postLoggedUser));

router.post("/logout", protectedRoutMiddleware, asyncWrapper(postLogoutUser));

router.get("/current", protectedRoutMiddleware, asyncWrapper(getCurrentUser));

router.patch("/", protectedRoutMiddleware, asyncWrapper(patchSubscription));

module.exports = router;
