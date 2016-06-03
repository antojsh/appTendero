const mongoose = require('mongoose');
const Schema 	 = mongoose.Schema;
const user = mongoose.model('User');
const negocio_schema = new Schema({
	user: {
		type:{ type: Schema.ObjectId, ref: "User" }
	},
	name: {
		type:String,
		required:"El Nombre es obligatorio"
	},
	description:{
		type:String,

	},
	photo		: String,
	date_register: { type: Date, default: Date.now }
});

var Negocio = mongoose.model('Negocio',negocio_schema);
module.exports= Negocio;