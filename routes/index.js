var express = require('express')
var router = express.Router();
var User = require('../models/users')
var status = require('../models/status')
var constants = require('../constants')
var middleware = require('../config/middleware');
var service = require('../config/service');
var multer = require('multer');

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
	console.log(JSON.stringify(req.body))
	User.findOne({user: req.body.user,password:req.body.password}, function(err, user) {
	    if(err) 
	    	return res.send(res.response(403,null,constants.messages.ERROR_LOGIN));
	    if(!user) 
	    	return res.send(res.response(200,null,constants.messages.NO_LOGIN));

	    return res.send(res.response(200,{token: service.createToken(user)}));
	});
})
router.post('/signin',function(req,res){
	
	var user= new User({
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
})

router.route('/user/uploadimage')
.post(upload.single('file'),function(req,res){
	res.send({message:'Archivo guardado', file:req.file});
})
// require('json-response');
// login= function (req, res) {
// 	res.render(__dirname + '/../views/home');
// }
// timeline= function  (req,res) {
// 	res.render(__dirname + '/../views/timeline');
// }
// authLogin= function(req,res){
// 	console.log(req.body.user+'  '+req.body.password)
// 	User.findOne({user: req.body.user,password:req.body.password}, function(err, user) {
// 	        if(err) return res.send(res.response(403,null,constants.messages.ERROR_LOGIN));
// 	        if(!user) return res.send(res.response(200,null,constants.messages.NO_LOGIN));
// 	        return res.send(res.response(200,{token: service.createToken(user)}));
	          
// 	});
// }
// register = function(req,res){
// 	console.log(JSON.stringify(req.body))
// 	var user= new User({
// 		name:req.body.name,
// 		user:req.body.user,
// 		email: req.body.email,
// 		password:req.body.password,
// 		password_confirmation:req.body.password_confirmation,		
		
		
// 	})
// 	user.save(function(err){
// 		if(err){
// 			res.send(res.response(500,{error:true},err))
// 		}else{

// 			res.send(res.response(200, user,constants.messages.USER_SAVE))
// 		}
// 	})
// }
// getusers=function(req,res){
// 	var reponse= status;
// 	User.find(function(err,users){
// 		if(err) console.log('Error')
// 		res.send(res.response(200, {users}))
// 	})
// }
// // Operacion DB
// //app.get('/getusers',middleware.ensureAuthenticated,getusers);
// app.get('/getusers',getusers);
// app.post('/saveUser',register);

// // Views render
// app.get('/',login)
// app.get('/timeline',timeline)
// app.post('/auth/login',authLogin);

module.exports = router