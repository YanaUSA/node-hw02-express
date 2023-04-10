const express = require("express");
const router = express.Router();

const {
  postUserValidation,
  postUserLoginValidation,
  postUserVerificationValidation,
} = require("../../middlewares/usersValidationMiddleware");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  postUser,
  postLoggedUser,
  postVerifiedUser,
  postLogoutUser,
  getCurrentUser,
  patchSubscription,
  getUserVerification,
} = require("../../controllers/usersControllers");

const { protectedRoutMiddleware } = require("../../middlewares/authMiddleware");

router.post("/register", postUserValidation, asyncWrapper(postUser));

router.get("/verify/:verificationToken", asyncWrapper(getUserVerification));

router.post(
  "/verify",
  postUserVerificationValidation,
  asyncWrapper(postVerifiedUser)
);

router.post("/login", postUserLoginValidation, asyncWrapper(postLoggedUser));

router.post("/logout", protectedRoutMiddleware, asyncWrapper(postLogoutUser));

router.get("/current", protectedRoutMiddleware, asyncWrapper(getCurrentUser));

router.patch("/", protectedRoutMiddleware, asyncWrapper(patchSubscription));

module.exports = router;
