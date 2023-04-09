const {
  addUser,
  logUser,
  saveTokenForUser,
  deleteTokenFromDB,
  setSubscription,
} = require("../utils/userUtils");
const { signToken } = require("../services/JWTServices");
const ImageService = require("../services/ImageService");

const postUser = async (req, res, next) => {
  const newUser = await addUser(req.body);

  if (!newUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  newUser.password = undefined;

  const { email, subscription } = newUser;

  res.status(201).json({ user: { email, subscription } });
};

const postLoggedUser = async (req, res) => {
  const { password } = req.body;

  const loggedUser = await logUser(req.body);

  if (!loggedUser) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const passwordIsValid = await loggedUser.checkPassword(
    password,
    loggedUser.password
  );

  if (!passwordIsValid) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  loggedUser.password = undefined;

  const token = signToken(loggedUser.id);

  const { email, subscription } = await saveTokenForUser(loggedUser.id, {
    token,
    user: loggedUser,
  });

  res.status(200).json({ token, user: { email, subscription } });
};

const patchAvatar = async (req, res) => {
  const { file, user } = req;

  if (file) {
    user.avatarURL = await ImageService.save(
      file,
      250,
      250,
      "avatars"
      // user.id
    );

    const updatedUser = await user.save();

    return res.status(200).json({
      avatarURL: updatedUser.avatarURL,
    });
  }
};

const postLogoutUser = async (req, res) => {
  const loggedUser = req.user;

  await deleteTokenFromDB(loggedUser.id);

  res.sendStatus(204);
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

const patchSubscription = async (req, res) => {
  const changeSubscription = req.body;
  const loggedUser = req.user;

  const changedSubscription = await setSubscription(
    loggedUser.id,
    changeSubscription
  );

  if (!changedSubscription) {
    return res.status(400).json({ message: "Wrong subscription value" });
  }

  const { email, subscription } = changedSubscription;

  res.sendStatus(200).json({ user: { email, subscription } });
};

module.exports = {
  postUser,
  postLoggedUser,
  patchAvatar,
  postLogoutUser,
  getCurrentUser,
  patchSubscription,
};
