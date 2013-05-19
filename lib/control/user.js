var Mongoose = require('mongoose');
var User = require('../model/user');

exports.create = function(app) {
	app.get("/user/:user", function(req, res, next) {
		User.findById(req.params.user, function(err, user) {
			if (err) {
				next(err);
				return;
			}
			
			if (!user) {
				res.send(404);
				return;
			}

			res.json(user.toObject());
		});
	});

	app.post("/user", function(req, res, next) {
		var u = new User(req.body);
		u.save(function(err) {
			if (err) {
				next(err);
				return;
			}
			
			req.session.user = u.toObject();
			
			if(req.accepts('html')) {
				console.log('redirect');
				res.redirect(302, '/cal');
			} else {
				console.log(u);
				res.json(201, u);
			}
		});
	});
	
	app.put("/user/:user", function(req, res, next) {
		User.findByIdAndUpdate(req.params.user, req.body, function(err, user) {
			if(err) {
				next(err);
				return;
			}
			
			if(!user) {
				res.send(404);
				return;
			}
			
			res.json(user.toObject());
		});
	});
	
	app['delete']("/user/:user", function(req, res, next) {
		User.findByIdAndRemove(req.params.user, req.body, function(err, user) {
			if(err) {
				next(err);
				return;
			}
			
			if(!user) {
				res.send(404);
				return;
			}
			
			res.send(204);
		});
	});

};
