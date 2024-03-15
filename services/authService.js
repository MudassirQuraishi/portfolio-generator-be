const ApiError = require("../util/ApiError");

const userService = require("./userService");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !user.isPasswordMatch(password)) {
    throw new ApiError(401, "Invalid email or password", "UNAUTHORIZED");
  }
  if (!user.isEmailVerified) {
    throw new ApiError(403, "Email not verified", "FORBIDDEN");
  }
  return user;
};
module.exports = {
  loginUserWithEmailAndPassword,
};
