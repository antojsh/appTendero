var express = require('express')
var app 	= express();
var server 	= require('http').Server(app);
var io 		= require('socket.io')(server);
var path 	= require('path');
app.use('/static', express.static('static'));
app.set('view engine','jade');
server.listen(3000);
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});




//routes

login= function (req, res) {
  res.render(__dirname + '/views/home');
}
app.get('/',login)