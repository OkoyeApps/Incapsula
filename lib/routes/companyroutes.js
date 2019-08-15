var router = require('express').Router();
var companyValidator = require('../validators/companyvalidator');
var companyController = require('../controllers/companycontroller');
var validator = require('../middlewares/validator');
var authMiddleware = require('../middlewares/authentication');
module.exports = function () {
    var companyCtrl = new companyController();
    router.post('/addcompany', [validator(companyValidator.createCompanyShema), authMiddleware.authenticate], companyCtrl.createcompany)
    router.post('/addsite', [validator(companyValidator.createsiteSchema), authMiddleware.authenticate], companyCtrl.addsite);
    return router;
}