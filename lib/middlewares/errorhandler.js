var mongoose = require('mongoose');
var ValidationError = mongoose.Error.ValidationError;

module.exports = (err, req, res, next) => {
    if (err) {
        if (err.data instanceof ValidationError) {
            var errorArray = [];
            Object.keys(err.data.errors).map(key => {
                errorArray = [...errorArray, err.data.errors[key].message.replace("Path", "").replace(/`/g, "").trim()];
            });
            res.status(400).send({ data: errorArray, success: false, message: err.message });
        } else if (err.message) {
            res.status(500).send({ data: err.data, success: false, message: err.message });
        } else {
            res.status(500).send({ data: null, success: false, message: "something went wrong" });
        }
    }
}