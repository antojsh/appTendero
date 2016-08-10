'use strict'
const User 			= require('../models/users')
const constants	 	= require('../constants')
const service 		= require('../config/service');
const user = {
	login: function(req,res){
		console.log(req.body.user)
		User.findOne({user: req.body.user,password:req.body.password}, function(err, user) {
		    if(err)
		    	return res.send(res.response(403,null,constants.messages.ERROR_LOGIN));
		    if(!user) 
		    	return res.send(res.response(200,null,constants.messages.NO_LOGIN));

		    return res.send(res.response(200,{token: service.createToken(user)},user));
		});
	},
	signin: function(req,res){
		let user= new User({
			name:req.body.name,
			user:req.body.user,
			email: req.body.email,
			password:req.body.password,
			password_confirmation:req.body.password_confirmation,		
		})
		user.save(function(err){
			if(err){
				res.send(res.response(500,{error:true},err))
			}else{
				res.send(res.response(200, user,constants.messages.USER_SAVE))
			}
		})
	},
	findById:function(req,res){
		User.find({'_id':req.params.id},function(err,usuario){
			if(err)
				res.send(res.response(500,{error:true},err))
			else
				res.send(res.response(200, usuario))
		})
	},
	update:function(req,res){
		User.findById(req.params.id, function(err, usuario) {
			if(!usuario){
				return res.send(res.response(404, 'Usuario no encontrado'))
			}
			if(err){
				return res.send(res.response(500, 'ERROR'))
			}
	  		usuario.name =req.body.name
	  		usuario.user=req.body.user
	  		usuario.email=req.body.email
	  		usuario.password=req.body.password
	  		usuario.password_confirmation=req.body.password_confirmation
	        usuario.save(function(err) {
	            if(err){
	            	return res.send(res.response(404, 'No se puedo guadar el usuario'))
	            }
	        res.send(res.response(200, usuario))
	      	});
	    });
	}
	

}
module.exports = user;