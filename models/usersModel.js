const { mongoose, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.checkPassword = (candidate, hashedPass) =>
  bcrypt.compare(candidate, hashedPass);

const User = mongoose.model("user", userSchema);

module.exports = User;
