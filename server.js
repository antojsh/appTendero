var express 	= require('express')
var app 		= express();
var server 		= require('http').Server(app);
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var cors        = require('cors');  
var conexion    = require('./conexion')()
var socket      = require('./socket')(server);
var passport 	= require('passport');
require('./socialauth/passport')(passport,app);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: true}));  
app.use(cors());  
app.use('/static', express.static('static'));
app.set('view engine','jade');
app.listen(3000)
app.use(passport.initialize());
app.use(passport.session());
require('./routes')(app)









