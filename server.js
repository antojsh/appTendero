var express 	  = require('express')
var app 		    = express();
var server 		  = require('http').Server(app);
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var conexion    = require('./conexion')()
var socket      = require('./socket')(server);
var router      = require('./routes')(app)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/static', express.static('static'));
app.set('view engine','jade');
app.listen(3000)








