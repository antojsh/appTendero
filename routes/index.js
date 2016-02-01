module.exports = function (app) {


login= function (req, res) {
	res.render(__dirname + '/../views/home');
}
timeline= function  (req,res) {
	res.render(__dirname + '/../views/timeline');
}
register = function(req,res){

	var establecimiento={
		name:req.body.name,
		user:req.body.user,
		email: req.body.email,
		password:req.body.password
	}
	db.insertRow('establecimientos',establecimiento,function(err){
		if(err) res.send('error')
		else res.send('Establecimiento guardado')
	})
}
app.get('/',login)
app.get('/timeline',timeline)
app.post('/register',register)
}