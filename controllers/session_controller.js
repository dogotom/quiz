//MW de autorizacion de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};

// get /login - formulario de login
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors:errors});
};


// post /login - crear sesion
exports.create = function(req, res) {

	var login = req.body.login;
	var password = req.body.password;

	// variable de sesion donde se guarda la hora de la ultima actividad
	req.session.horaUltimoAcceso = (new Date()).getTime();

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if (error) {
			req.session.errors = [{"message": 'Se ha producido un error: ' +error}];
			res.redirect("/login");
			return;
		}
		// crea user y guarda id y nombre
		req.session.user = {id:user.id, username:user.username};
		res.redirect(req.session.redir.toString()); //redireccion a path anterior al login
	});
};


//get /logout - destruir sesion
exports.destroy = function (req,res) {
	delete req.session.user;
	res.redirect(req.session.redir.toString()); //redireccion a path anterior al login
};