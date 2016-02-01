var mongoose = require('mongoose');
var conexion =function(){
	mongoose.connect('mongodb://localhost/tendero',function(err){
	  if(err) console.log('No se puedo conectar')
	  else    console.log('Conectado');
	})
}
module.exports= conexion