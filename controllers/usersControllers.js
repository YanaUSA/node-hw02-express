const sendEmail = require("../services/mailService");

const {
  addUser,
  verifyUser,
  checkVerification,
  logUser,
  saveTokenForUser,
  deleteTokenFromDB,
  setSubscription,
} = require("../utils/userUtils");
const { signToken } = require("../services/JWTservices");

const postUser = async (req, res, next) => {
  const newUser = await addUser(req.body);

  if (!newUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  newUser.password = undefined;

  const { email, verificationToken, subscription } = newUser;

  const verifyEmail = {
    to: email,
    subject: "Test email",
    // text: "Please verify your email, click the link",
    html: `<a target="_blank" href="${process.env.BASE_URL}api/users/verify/${verificationToken}"> Please verify your email, click the link</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({ user: { email, subscription } });
};

const getUserVerification = async (req, res) => {
  const { verificationToken } = req.params;

  const userHasVerifyToken = await verifyUser(verificationToken);

  if (!userHasVerifyToken) {
    res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "Verification successful" });
};

const postVerifiedUser = async (req, res) => {
  const { email } = req.body;

  const verifiedUser = await checkVerification({ email });

  if (!verifiedUser) {
    res.status(404).json({ message: "User not found" });
  }
  if (verifiedUser.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const verifyEmail = {
    to: email,
    subject: "Test email",
    text: "Please verify your email, click the link",
    html: `Verification link <a target="blank" href="${process.env.BASE_URL}api/users/verify/${verifiedUser.verificationToken}">`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
};

const postLoggedUser = async (req, res) => {
  const { password } = req.body;

  const user = await logUser(req.body);

  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  if (!user.verify) {
    return res.status(401).json({ message: "Email is not verified" });
  }

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  user.password = undefined;

  const token = signToken(user.id);

  const { email, subscription } = await saveTokenForUser(user.id, {
    token,
    user,
  });

  res.status(200).json({ token, user: { email, subscription } });
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
  postLogoutUser,
  getCurrentUser,
  patchSubscription,
  getUserVerification,
  postVerifiedUser,
};
