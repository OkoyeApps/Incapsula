var joi = require('joi');

module.exports.createCompanyShema = joi.object().keys({
    name: joi.string().required().trim(),
    address: joi.string().trim().allow(''),
    apiid: joi.string().required().trim(),
    apikey: joi.string().required().trim(),
});

module.exports.createsiteSchema = joi.object().keys({
    siteid: joi.string().required().trim(),
    sitename: joi.string().required().trim(),
    company: joi.string().required().trim()
});
