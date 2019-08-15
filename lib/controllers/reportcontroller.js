var reportservice = require('../services/reportservices');
module.exports = function () {
    //generate report
    this.generatereport = (req, res) => {
        reportservice.generatereport(req.auth.userid, req.body).then(data => {
            res.send(data);
        }).catch(error => res.send(error));
    }
}
