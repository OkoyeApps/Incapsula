var authservice = require('../services/authservice');
module.exports = function () {
    this.signUp = (req, res) => {
        console.log("in the singup");
        authservice.register(req.body).then(data => {
            res.status(200).send(data);
        }).catch(error => res.status(400).send(error));
    }

    this.signIn = (req, res) => {
        console.log("in the singin");
        authservice.authenticate(req.body).then(data => {
            res.status(200).send(data);
        }).catch(error => res.status(400).send(error));
    }
}