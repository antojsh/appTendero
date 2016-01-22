module.exports = function (app) {
	login= function (req, res) {
	  res.sendFile(__dirname + '/../../static/html/login.html');
	}




	app.get('/',login)
}