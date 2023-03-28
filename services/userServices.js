const User = require("../models/usersModel");

const addUser = async (body) => {
  try {
    const { email } = body;

    const emailAlreadyExist = await User.findOne({ email });
    if (emailAlreadyExist) {
      return;
    }

    const newUser = await User.create(body);

    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};

const logUser = async (body) => {
  try {
    const { email } = body;

    const user = await User.findOne({ email });

    return user;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { addUser, logUser };
