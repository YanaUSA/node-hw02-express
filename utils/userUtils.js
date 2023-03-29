const User = require("../models/usersModel");

const addUser = async (body) => {
  try {
    const { email } = body;

    const emailAlreadyExist = await User.findOne({ email });
    if (emailAlreadyExist) {
      return;
    }

    return await User.create(body);
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

module.exports = { addUser, logUser, saveTokenForUser, deleteTokenFromDB };
