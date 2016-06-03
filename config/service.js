// services.js
var jwt = require('jwt-simple');  
var moment = require('moment');  
var token = require('./token');
var User = require('../models/users')

exports.createToken = function(user) {  
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  console.log('payload '+payload);
  return jwt.encode(payload, token.TOKEN_SECRET);
};