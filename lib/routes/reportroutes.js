var router = require('express').Router();
var reportValidator = require('../validators/reportvalidator');
var reportController = require('../controllers/reportcontroller');
var validator = require('../middlewares/validator');
var authMiddleware = require('../middlewares/authentication');
module.exports = function () {
    var reportCtrl = new reportController();
    router.post('/generatereport', [validator(reportValidator.reportschema), authMiddleware.authenticate], reportCtrl.generatereport)
    // router.post('/addsite', [validator(reportValidator.createsiteSchema), authMiddleware.authenticate], companyCtrl.addsite);
    return router;
}