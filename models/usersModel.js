const { mongoose, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  avatarURL: {
    type: String,
    // default: "http://localhost:3000/default-avatar.jpg",
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: "",
    required: [true, "Verify token is required"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const emailHash = await crypto
      .createHash("md5")
      .update(this.email)
      .digest("hex");

    this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=robohash`;
  }

  const salt = await bcrypt.genSalt(saltRounds);
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.checkPassword = (candidate, hashedPass) =>
  bcrypt.compare(candidate, hashedPass);

const User = mongoose.model("user", userSchema);

module.exports = User;
