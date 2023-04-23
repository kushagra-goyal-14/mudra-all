const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRY, JWT_SECRET } = require("../config/server-config");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    uniqueCaseInsensitive: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [3, "Password cannot be less than 3 characters"],
  },
  prev_predction: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
    lowercase: true,
    uniqueCaseInsensitive: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: {
      unique: true,
    },
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
    next();
  } else {
    return next();
  }
});
userSchema.methods.createToken = function () {
  try {
    return jwt.sign({ id: this._id, email: this.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
userSchema.methods.comparePass = function (password) {
  try {
    return bcrypt.compareSync(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
