const mongoose = require('mongoose');
const Schema 	 = mongoose.Schema;
const user = mongoose.model('User');
const negocio_schema = new Schema({
	user: {
		type:String,
		required:"El usuario es obligatorio"
	},
	name: {
		type:String,
		required:"El Nombre es obligatorio"
	},
	description:{
		type:String,
	},
	loc: {
	    type: [Number],  // [<longitude>, <latitude>]
	    index: '2d',      // create the geospatial index
	    required:"La posicion del negocio es obligatoria"
    },
	photo		: String,
	date_register: { type: Date, default: Date.now }
});

var Negocio = mongoose.model('Negocio',negocio_schema);
module.exports= Negocio;