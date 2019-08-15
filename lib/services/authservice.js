var user = require('../models/user.js');
var secret = process.env.secret;
var jwt = require('jsonwebtoken');
module.exports.register = (userdata) => {
    return new Promise((resolve, reject) => {
        user.findOne({ email: userdata.email }).exec((err, existinguser) => {
            if (existinguser) {
                reject({ data: null, status: false, message: "email already in use" });
            }
            else {
                var currentUser = new user();
                currentUser.email = userdata.email;
                currentUser.password = userdata.password;

                user.create({ email: userdata.email, password: userdata.password }, (err, data) => {
                    if (err) {
                        reject({ data: null, status: false, message: "email already in use" });
                    } else {
                        resolve({ data: null, success: true, message: "user created successfully" });
                    }

                })
            }
        })
    })
}


module.exports.authenticate = (userdata) => {

    return new Promise((resolve, reject) => {
        //get the user by email address
        user.findOne({ email: userdata.email }).exec((err, user) => {
            if (err) {
                resolve({ success: false, message: 'could not authenticate user' });
            }
            //return false if user does not exist
            else if (!user) {
                resolve({ success: false, message: 'could not authenticate user' });
            }
            else {
                //Validate the password
                var validPassword = user.comparePassword(userdata.password);
                if (!validPassword) {
                    resolve({ success: false, message: 'email or password incorrect' });
                } else {
                    //Generate JWT token for user
                    generateToken({ email: user.email })
                        .then((token) => {
                            resolve({ success: true, data: { email: user.email, token: token }, message: 'authentication successful' })
                        })
                        .catch((err) =>
                            resolve({ success: false, data: err, message: 'could not authenticate user' })
                        );
                }
            }
        });
    });
}

function generateToken(data = {}) {
    console.log("data for token", data);
    return new Promise((resolve, reject) => {
        jwt.sign(data, secret, { expiresIn: '24hr' }, function (err, token) {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

function verifyToken(token = "") {
    var regex = /(bearer[\s]?)/i;
    return new Promise((resolve, reject) => {
        jwt.verify(token.replace(regex, "").trim(), secret, function (err, decodedToken) {
            if (err) {
                reject(err);
            } else {
                resolve(decodedToken);
            }
        });
    });
};

exports.verifyToken = verifyToken;