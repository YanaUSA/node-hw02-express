const User = require("../models/usersModel");
const { decoded } = require("../services/JWTservices");

const protectedRoutMiddleware = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  let decodedToken;
  try {
    decodedToken = decoded(token);
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  const currentUser = await User.findById(decodedToken.id);
  if (!currentUser) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  req.user = currentUser;

  next();
};

module.exports = { protectedRoutMiddleware };
