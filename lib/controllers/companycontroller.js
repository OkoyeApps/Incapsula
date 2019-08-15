var companyservice = require('../services/companyservices');
module.exports = function () {
    this.createcompany = (req, res, next) => {
        companyservice.addcompany(req.body, req.auth).then(data => {
            res.status(200).send(data);
        }).catch(error => next(error));
    }

    this.addsite = (req, res, next) => {
        companyservice.addsite(req.body, req.auth).then(data => {
            res.status(200).send(data);
        }).catch(error => next(error));
    }
}