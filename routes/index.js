'use strict'
const express = require('express')
const router = express.Router();
const status = require('../models/status')
const constants = require('../constants')
const middleware = require('../config/middleware');
const service = require('../config/service');
const multer = require('multer');

const User = require('../models/users')
const Negocio = require('../models/negocio')


// Multer Storage para mantener la extenteción del archivo.
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/img'); // Directirio donde se guardaran los archivos.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname);
  }
})

var upload = multer({ storage: storage });
require('json-response');
router.use('/user',middleware.ensureAuthenticated)
router.get('/',function(req,res){
	res.send('Hola Mundo')
})

/*
Rutas Publicas
Incio de sesion y Registro
*/
router.post('/login',function(req,res){
	User.findOne({user: req.body.user,password:req.body.password}, function(err, user) {
	    if(err)
	    	return res.send(res.response(403,null,constants.messages.ERROR_LOGIN));
	    if(!user) 
	    	return res.send(res.response(200,null,constants.messages.NO_LOGIN));

	    return res.send(res.response(200,{token: service.createToken(user)},user));
	});
})

router.post('/signin',function(req,res){
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
});


// De Aqui en adelante todas las rutas requieren Autenticacion
router.use(middleware.ensureAuthenticated)
router.route('/user/uploadimage')
.post(upload.single('file'),function(req,res){
	res.send({message:'Archivo guardado', file:req.file});
});

// CRUD NEOGOCIO
router.route('/user/negocio/:id')
.post(function(req,res){
	let negocio = new Negocio({
		user:req.body.userid,
		name:req.body.name,
		description: req.body.description,
		photo:req.body.photo
	})
	negocio.save(function(err){
		if(err){
			res.send(res.response(500,{error:true},err))
		}else{
			res.send(res.response(200, negocio,'Negocio Guardado'))
		}
	})
})
.get(function(req,res){
	Negocio.find({'_id':req.params.id},function(err,negocio){
		if(err)
			res.send(res.response(500,{error:true},err))
		else
			res.send(res.response(200, negocio))
	})
})
.put(function(req,res){
	Negocio.findById(req.params.id, function(err, negocio) {
        negocio.user=req.body.userid
		negocio.name=req.body.name
		negocio.description = req.body.description
		negocio.photo = req.body.photo
        negocio.save(function(err) {
            if(err) 
            	{return res.send(res.response(500, 'ERROR'))}
      		
      		res.send(res.response(200, negocio))
        });
    });
})
.delete(function(req,res){
	Negocio.findById(req.params.id, function(err, negocio) {
        negocio.remove(function(err) {
            if(err) 
            	return  res.send(res.response(500, 'ERROR'));
      		
      		res.send(res.response(200, null,'Eliminado Correctamente'));
        })
    });
});


// CRDU USUARIO
router.route('/user/:id')
.get(function(req,res){
	User.find({'_id':req.params.id},function(err,usuario){
		if(err)
			res.send(res.response(500,{error:true},err))
		else
			res.send(res.response(200, usuario))
	})
})
.put(function(req,res){
	User.findById(req.params.id, function(err, usuario) {
  		usuario.name =req.body.name
  		usuario.user=req.body.user
  		usuario.email=req.body.email
  		usuario.password=req.body.password
  		usuario.password_confirmation=req.body.password_confirmation
        usuario.save(function(err) {
            if(err) 
            	{return res.send(res.response(500, 'ERROR'))}
      		
      		res.send(res.response(200, usuario))
        });
    });
})







module.exports = router