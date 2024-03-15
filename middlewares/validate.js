const Joi = require("joi");
const pick = require("../util/pick");
const ApiError = require("../util/ApiError");

const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" }, abortEarly: false })
        .validate(object);
    if (error) {
        throw new ApiError(400, error.message, "BAD_REQUEST");
    }
    Object.assign(req, value);
    return next();
};

module.exports = validate;
