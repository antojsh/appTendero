module.exports = function (app) {
	login= function (req, res) {
	  console.log('Entro /')
	  res.sendFile(__dirname + '/../../static/html/login.html');
	}
	register = function(req,res){
	
	}



	app.get('/',login)
	app.post('/register',register)
}