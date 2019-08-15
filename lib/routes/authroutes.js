var router = require('express').Router();
var authvalidator = require('../validators/authvalidator');
var authController = require('../controllers/authcontroller');
var validator = require('../middlewares/validator');
module.exports = function () {
    var authCtrl = new authController();
    router.post('/signup', [validator(authvalidator.registerSchema)], authCtrl.signUp)
    router.post('/login', [validator(authvalidator.loginSchema)], authCtrl.signIn);
    return router;
}