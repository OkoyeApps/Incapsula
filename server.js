var express = require('express');
var app = express();
var morgan = require('morgan');
var cookieparser = require('cookie-parser');
require('dotenv').config();
var compression = require('compression');
var router = express.Router();
var rootRouter = require('./lib/routes/index')(router);
var cors = require('cors');
var http = require('http');
var path = require('path');
var errorhandler = require('./lib/middlewares/errorhandler');



app.use(compression());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //for parsing application/x-www-form-urlencoded
app.use(cookieparser());
app.use(cors());
app.use('/api', rootRouter);


app.use(errorhandler);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname,"/public/views/index.html"));
})

module.exports = app;