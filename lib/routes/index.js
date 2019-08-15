var authroute = require('./authroutes');
var companyroute = require('./companyroutes');
var reportroute = require('./reportroutes');

module.exports = (router) => {
    router.use('/auth', authroute());
    router.use('/setting', companyroute());
    router.use('/report', reportroute());
    return router;
}