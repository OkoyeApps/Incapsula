var authService = require('../services/AuthService');
var user = require('../models/user');
exports.authenticate = function (req, res, next) {
    console.log("in the auth middleware")
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        authService.verifyToken(token, userType = '').then(decoded => {
            user.findOne({ email: decoded.email }, '').then(data => {
                if (data == null) {
                    res.status(401).send({ success: false, message: "User does not exist" });
                }
                else {
                    req.auth = {
                        email: data.email,
                        userid: data._id
                    };
                    next();
                }
            });
        }).catch(err => {
            res.status(401).send({ success: false, message: "un-authorized access", data: err });
        });
    } else {
        res.status(401).send({ success: false, message: "un-authorized access" });
    }
};

exports.authorize = (claims = []) => (req, res, next) => {
    claims.map(claim => {
        if (req.auth.email === 'admin@tenece.com') {
            next();
        } else {
            res.status(401).send({ success: false, message: "un-authorized access", data: null });
        }
    })
}

