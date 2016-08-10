'use strict'
const express 		= require('express')
const router 		= express.Router();
const status 		= require('../models/status')
const constants	 	= require('../constants')
const middleware 	= require('../config/middleware');
const service 		= require('../config/service');
const multer 		= require('multer');
const UserController = require('../controllers/user');
const negocioController = require('../controllers/negocio');
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
	res.render('../views/index')
})

/*
Rutas Publicas
Incio de sesion y Registro
*/
router.post('/login',UserController.login)
router.post('/signin',UserController.signin);


// De Aqui en adelante todas las rutas requieren Autenticacion
router.use(middleware.ensureAuthenticated)
router.route('/user/uploadimage')
.post(upload.single('file'),function(req,res){
	res.send({message:'Archivo guardado', file:req.file});
});

// CRUD NEOGOCIO
router.route('/user/negocios/:iduser')
.get(negocioController.findAll)

router.route('/user/negocio/:id')
.post(negocioController.save)
.get(negocioController.findById)
.put(negocioController.update)
.delete(negocioController.delete);

// FIND BY POSITION
router.route('/user/negocio/position/:position')
.get(negocioController.findByPosition)

// CRDU USUARIO
router.route('/user/:id')
.get(UserController.findById)
.put(UserController.update)


module.exports = router