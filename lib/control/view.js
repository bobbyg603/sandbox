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
	
	app.post('/login', function(req, res, next) {
		User.findOne({ name : req.body.name }, function(err, user) {
			if(err) {
				next(err);
				return;
			}
			
			if(!user) {
				res.redirect('/');
				return;
			}
			
			req.session.user = user
			res.redirect('/cal');
		})
	});
	
	app.get('/logout', function(req, res, next) {
		req.session = null;
		res.redirect('/');
	});
};
