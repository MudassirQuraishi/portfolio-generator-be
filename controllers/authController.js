const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const userService = require("../services/userService");
const emailService = require("../services/emailServices");
const authService = require("../services/authService");
const catchAsync = require("../util/async");
const ApiError = require("../util/ApiError");

const signup = catchAsync(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = await userService.createUser(req.body, { session });
        const token = uuidv4();
        await userService.updateVerificationToken(user, token, { session });
        await emailService.sendVerificationEmail(user.email, token);
        await session.commitTransaction();
        return res.status(201).json({ success: true });
    } catch (error) {
        await session.abortTransaction();
        throw new ApiError(error.statusCode, error.message, error.name);
    } finally {
        session.endSession();
    }
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(
        email,
        password
    );
    return res.status(200).json({ success: true, user: user.toJSON() });
});

const verifyEmail = catchAsync(async (req, res) => {
    const user = await userService.verifyUser(req.params.token);
    if (!user) {
        res.status(204).json();
    }
    res.status(200).json({ success: true });
});
module.exports = {
    signup,
    login,
    verifyEmail,
};
