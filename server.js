var express 	= require('express')
var app 		= express();
var server 		= require('http').Server(app);
var io 			= require('socket.io')(server);
var path    	= require('path');
var r 			= require('rethinkdb');
var db 			= require('./rethink');
var models 		= require('./modelsdb');
var bodyParser  = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/static', express.static('static'));
app.set('view engine','jade');
app.listen(3000)

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

 r.connect({
     host: 'localhost',
     port: 28015
 }, function (err, conn) {
     if (err) throw err;
     connection = conn;
     if (connection) {
         console.log("Conexion exitosa");
         //db.createTable ('establecimientos',models.establecimietos);
         //getRows('autores');
         //getRowsByColumnValue('autores','name',"William Adama");
         //getRowsFeed('autores',service);
     } else {
         console.log("connection closed");
     }

 })


login= function (req, res) {
	res.render(__dirname + '/views/home');
}
timeline= function  (req,res) {
	res.render(__dirname + '/views/timeline');
}
register = function(req,res){
	var establecimiento={
		name:req.body.name,
		user:req.body.user,
		email: req.body.email,
		password:req.body.password
	}
	db.insertRow('establecimientos',establecimiento,function(err){
		if(err) res.send('error')
		else res.send('Establecimiento guardado')
	})
}
app.get('/',login)
app.get('/timeline',timeline)
app.post('/register',register)




