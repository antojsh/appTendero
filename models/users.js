var mongoose = require('mongoose');
var Schema 	 = mongoose.Schema;

var users_schema = new Schema({
	name: String,
	user:String,
	email:String,
	password:String,
	provider_id	: String,
	provider	: String,
	name		: String,
	photo		: String,
	date_birthday: { type: Date, default: Date.now },
	date_register: { type: Date, default: Date.now }
});

var User = mongoose.model('User',users_schema);
module.exports= User;