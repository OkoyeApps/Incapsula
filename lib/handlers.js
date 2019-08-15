var handlers = {};

handlers.users = {};

handlers.routes = (data, callback) => {
    var acceptableMethods = ['POST', 'GET', 'PUT', 'DELETE'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method.toLowerCase()](data, callback);
    } else {
        callback(405);
    }
}



module.exports = handlers;