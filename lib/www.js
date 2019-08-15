#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../server');
// var logger = require('../dist/util/logger');
var path = require('path');
var fs = require('fs');
var http = require('http');
// var normalizePort = require('normalize-port');

var dbConfiguration = require('./dbconfig');

/**
 * Get port from environment and store in Express.
 */


var port = normalizePort(process.env.PORT || '8080');


/**
 * Create HTTP server.
 */
var server = http.createServer(app);
// const certOptions = {
//     key : fs.readFileSync(path.resolve('bin/certs/server.key')),
//     cert : fs.readFileSync(path.resolve('bin/certs/server.crt'))
// }

// process.env.NODE_ENV == 'developement' ?
//  server = http.createServer(certOptions, app)  : 
//  server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Database configuration
 */

dbConfiguration();
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// NotificationConfig(socket);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    console.log("server listening on", addr);
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    // logger.default.info('Listening on ' + bind);
}