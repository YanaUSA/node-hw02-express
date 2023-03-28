const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { addUser, logUser } = require("../services/userServices");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

const postUser = async (req, res, next) => {
  const { password, ...restUserData } = req.body;

  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await addUser({
    ...restUserData,
    password: hashedPassword,
  });

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

  const passwordIsValid = await bcrypt.compare(password, loggedUser.password);

  if (!passwordIsValid) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  loggedUser.password = undefined;

  const token = signToken(loggedUser.id);

  const { email, subscription } = loggedUser;

  res.status(200).json({ token, user: { email, subscription } });
};

module.exports = {
  postUser,
  postLoggedUser,
};
