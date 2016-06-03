var mongoose = require('mongoose');
var Schema 	 = mongoose.Schema;
var user = mongoose.model('User');
var images_schema = new Schema({
	name: {
		type:String,
		required:"El Nombre es obligatorio"
	},
	user:{
		type:{ type: Schema.ObjectId, ref: "User" }
	},
	date_upload: { type: Date, default: Date.now }
	
});

var User = mongoose.model('Images',images_schema);
module.exports= User;