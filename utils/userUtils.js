const { v4: uuidv4 } = require("uuid");
const User = require("../models/usersModel");

const addUser = async (body) => {
  try {
    const verificationCode = uuidv4();
    const { email } = body;

    const emailAlreadyExist = await User.findOne({ email });
    if (emailAlreadyExist) {
      return;
    }

    return await User.create({ ...body, verificationToken: verificationCode });
  } catch (error) {
    console.log(error.message);
  }
};

const verifyUser = async (verificationToken) => {
  try {
    const userWithTokenExist = await User.findOne({ verificationToken });

    if (!userWithTokenExist) {
      return;
    }

    return await User.findByIdAndUpdate(
      userWithTokenExist._id,
      { verificationToken: null, verify: true },
      { new: true }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const checkVerification = async (body) => {
  try {
    const { email } = body;

    const userWithTokenExist = await User.findOne({ email });

    if (!userWithTokenExist) {
      return;
    }

    return userWithTokenExist;
  } catch (error) {
    console.log(error.message);
  }
};

const logUser = async (body) => {
  try {
    const { email } = body;

    return await User.findOne({ email });
  } catch (error) {
    console.log(error.message);
  }
};

const saveTokenForUser = async (id, body) => {
  try {
    return await User.findByIdAndUpdate(id, body, {
      new: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteTokenFromDB = async (id) => {
  try {
    const loggedOutUser = await User.findByIdAndUpdate(
      id,
      { $unset: { token: 1 } },
      {
        new: true,
      }
    );

    return loggedOutUser;
  } catch (error) {
    console.log(error.message);
  }
};

const setSubscription = async (id, subscription) => {
  try {
    const getUserSubscription = await User.findByIdAndUpdate(id, subscription, {
      new: true,
      runValidators: true,
    });

    return getUserSubscription;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addUser,
  verifyUser,
  checkVerification,
  logUser,
  saveTokenForUser,
  deleteTokenFromDB,
  setSubscription,
};
