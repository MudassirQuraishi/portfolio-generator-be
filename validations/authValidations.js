const Joi = require("joi");
const { password } = require("./customValidation");

const signup = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        fullname: Joi.string().required(),
        phoneNumber: Joi.string().required(),
    }),
};
const login = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
    }),
};
const verifyEmail = {
    params: Joi.object().keys({
        token: Joi.string().required(),
    }),
};
module.exports = {
    signup,
    login,
    verifyEmail,
};
