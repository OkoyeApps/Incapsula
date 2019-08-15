var joi = require('joi');

module.exports.reportschema = joi.object().keys({
    start: joi.date().allow(''),
    end: joi.date().allow(''),
    definedtime: joi.string().allow(''),
    site: joi.string().required().trim()
});