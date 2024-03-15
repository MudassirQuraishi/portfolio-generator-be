const { default: isEmail } = require("validator/lib/isEmail");
const User = require("../models/User");
const ApiError = require("../util/ApiError");
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(409, "CONFLICT", "Email is already in use");
  }
  return User.create(userBody);
};
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};
const updateVerificationToken = async (user, token) => {
  const foundUser = await User.findOne({ email: user.email });
  if (!foundUser) {
    throw new ApiError(404, "User not found", "NOTFOUND");
  }
  foundUser.emailVerificationToken = token;
  await foundUser.save();
};
const verifyUser = async (token) => {
  const user = await User.findOne({ emailVerificationToken: token });
  if (!user) {
    throw new ApiError(404, "User not found", "NOTFOUND");
  }
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();
  return user;
};
const isUserVerified = async (user) => {};

module.exports = {
  createUser,
  getUserByEmail,
  updateVerificationToken,
  verifyUser,
  isUserVerified,
};
