var mongoose = require('mongoose');
var Schema 	 = mongoose.Schema;

var users_schema = new Schema({
	name: String,
	user:String,
	email:String,
	password:String,
	date_birthday: Date,
	date_register: Date
});

var User = mongoose.model('User',users_schema);
module.exports.User= User;