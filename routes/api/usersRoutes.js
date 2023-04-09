const express = require("express");
const router = express.Router();

const {
  postUserValidation,
  postUserLoginValidation,
  patchAvatarValidation,
} = require("../../middlewares/usersValidationMiddleware");

const { asyncWrapper } = require("../../helpers/asyncWrapper");

const {
  updateAvatarMiddleware,
} = require("../../middlewares/updateAvatarMiddleware");

const {
  postUser,
  postLoggedUser,
  patchAvatar,
  postLogoutUser,
  getCurrentUser,
  patchSubscription,
} = require("../../controllers/usersControllers");

const { protectedRoutMiddleware } = require("../../middlewares/authMiddleware");

router.post("/register", postUserValidation, asyncWrapper(postUser));

router.post("/login", postUserLoginValidation, asyncWrapper(postLoggedUser));

router.use("/", protectedRoutMiddleware);

router.patch(
  "/avatars",
  patchAvatarValidation,
  updateAvatarMiddleware,
  asyncWrapper(patchAvatar)
);

router.post("/logout", asyncWrapper(postLogoutUser));

router.get("/current", asyncWrapper(getCurrentUser));

router.patch("/", asyncWrapper(patchSubscription));

module.exports = router;
