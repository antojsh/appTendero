const mongoose = require('mongoose');
const Schema 	 = mongoose.Schema;
const user = mongoose.model('User');
const prestamos_schema = new Schema({
	
	user: {
		type:{ type: Schema.ObjectId, ref: "User" }
	},
	idCliente:{
		type:String
	},
	valorPrestamo:{
		type:Number
	},
	interesPrestamo:{
		type:Number
	},

	fecha_prestamo: { type: Date, default: Date.now }
});

var Prestamos = mongoose.model('Prestamos',prestamos_schema);
module.exports= Prestamos;