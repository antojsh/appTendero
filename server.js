const express 	= require('express')
const app 		= express();
const server 		= require('http').Server(app);
const bodyParser  = require('body-parser');
const cors        = require('cors');  
const conexion    = require('./conexion')()
//var socket      = require('./socket')(server);
const passport 	= require('passport');
const routes		= require('./routes');
const multipart   = require('connect-multiparty')
require('./socialauth/passport')(passport,app);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(routes);
app.use(multipart())
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: true}));  
app.use(cors());  
app.use('/static', express.static('static'));
app.set('view engine','jade');
app.listen(3000)
app.use(passport.initialize());
app.use(passport.session());











