var joi = require('joi');

module.exports.loginSchema = joi.object().keys({
    email: joi.string().required().trim(),
    password: joi.string().required().trim()
});

module.exports.registerSchema = joi.object().keys({
    email: joi.string().required().trim(),
    password: joi.string().required().trim()
});
