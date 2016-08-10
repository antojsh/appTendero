var jwt = require('jwt-simple');  
var moment = require('moment');  
var config = require('./token');

exports.ensureAuthenticated = function(req, res, next) {
  console.log(req.headers.authorization)
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "No estas autorizado acceder a esta url"});
  }

  var token = req.headers.authorization;
  try{
    var payload = jwt.decode(token, config.TOKEN_SECRET);
  }catch(e){
     return res
         .status(403)
         .send({message: "No estas autorizado acceder a esta url"});
  }

  if(payload.exp <= moment().unix()) {
  	console.log('Token Expirado')
     return res
         .status(403)
        .send({message: "El token ha expirado"});
  }

  req.user = payload.sub;
  next();
}
