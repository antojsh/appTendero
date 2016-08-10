'use strict'
const Negocio 		= require('../models/negocio')
const negocio = {
	save: function(req,res){
		console.log(req.body.position)
		let negocio = new Negocio({
			user:req.body.userid,
			name:req.body.name,
			description: req.body.description,
			photo:req.body.photo,
			//loc:JSON.parse(req.body.position),
			
		})
		negocio.save(function(err){
			if(err){
				res.send(res.response(500,{error:true},err))
			}else{
				res.send(res.response(200, negocio,'Negocio Guardado'))
			}
		})
	},
	findAll: function(req,res){
		Negocio.find({'user':req.params.iduser},function(err,negocio){
			if(err)
				res.send(res.response(500,{error:true},err))
			else
				res.send(res.response(200, negocio))
		})
	},
	findByPosition: function(req,res){
		console.log(req.params.position)
		let limit = 10;
		let maxDistance = 0.006;
		let coords 		= JSON.parse(req.params.position)
		
		Negocio.find({
	      loc: {
	        $near: coords,
	        $maxDistance: maxDistance
	      }
	    }).limit(limit).exec(function(err, negocios) {
	      if (err) {
	        return res.send(res.response(500,{error:true},err))
	      }
	      res.send(res.response(200, negocios))
	     // res.json(200, locations);
	    });
	},
	findById: function(req,res){
		Negocio.find({'_id':req.params.id},function(err,negocio){
			if(err)
				res.send(res.response(500,{error:true},err))
			else
				res.send(res.response(200, negocio))
		})
	},
	update: function(req,res){
		Negocio.findById(req.params.id, function(err, negocio) {
			if(!negocio){
				return res.send(res.response(404, 'Negocio no encontrado'))
			}
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
	},
	delete: function(req,res){
		Negocio.findById(req.params.id, function(err, negocio) {
			if(!negocio){
				return res.send(res.response(404, null,'El negocio no existe'));
			}
	        negocio.remove(function(err) {
	            if(err) 
	            	return  res.send(res.response(500, 'ERROR'));
	      		
	      		res.send(res.response(200, null,'Eliminado Correctamente'));
	        })
	    });
	}
}
module.exports= negocio