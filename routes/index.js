module.exports = function (app) {
var User = require('../models/users')
var status = require('../models/status')
var constants = require('../constants')
var middleware = require('../config/middleware');
var service = require('../config/service');
require('json-response');
login= function (req, res) {
	res.render(__dirname + '/../views/home');
}
timeline= function  (req,res) {
	res.render(__dirname + '/../views/timeline');
}
authLogin= function(req,res){
	User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
	        if(err) return res.send(res.response(403,null,constants.messages.ERROR_LOGIN));
	        if(user.length>0) return res.send(res.response(200,null,constants.messages.NO_LOGIN));
	        return res
	            .status(200)
	            .send({token: service.createToken(user)});
	});
}
register = function(req,res){
	console.log(JSON.stringify(req.body))
	var user= new User({
		name:req.body.name,
		user:req.body.user,
		email: req.body.email,
		password:req.body.password,
		photo		: ''
		
	})
	user.save(function(err){
		var reponse= status;
		if(err){

			reponse.code=false;
			reponse.message=
			res.send(res.response(200,null,constants.messages.USER_NO_SAVE))
		}
			res.send(res.response(200, user,constants.messages.USER_SAVE))
	})
}
getusers=function(req,res){
	var reponse= status;
	User.find(function(err,users){
		if(err) console.log('Error')
		res.send(res.response(200, {users}))
	})
}
// Operacion DB
app.get('/getusers',middleware.ensureAuthenticated,getusers);
app.post('/saveUser',register);

// Views render
app.get('/',login)
app.get('/timeline',middleware.ensureAuthenticated,timeline)
app.post('/auth/login',authLogin);

}