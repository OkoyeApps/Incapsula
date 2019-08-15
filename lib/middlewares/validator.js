var joi = require('joi');

module.exports = (schema) => (req, res, next) => {
    var result = validate(req.body, schema);
    req.validationError = result;
    if (result) {
        res.status(400).send(result);
    } else {
        next();
    }
}

function validate(data, schema) {
    console.log("data gotten", data)
    var result = joi.validate(data, schema);
    if (result.error == null) {
        return;
    } else {
        return result.error.details.map(error => new String(error.message));
    }
}
