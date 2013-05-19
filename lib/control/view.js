var User = require('../model/user');

exports.create = function(app) {
	app.get('/', function(req, res, next) {
		res.render('index.html');
	});
	
	app.get('/cal', function(req, res, next) {
		res.locals.session = req.session || {};
		res.render('cal.html')
	});
	
	app.get('/signup', function(req, res, next) {
		res.render('user/create.html');
	});
	
	app.get('/logout', function(req, res, next) {
		req.session = null;
		res.redirect('/');
	});
};
