var Mongoose = require('mongoose');
var User = require('../model/user');
var ActiveUsers = require('../model/activeUsers');

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
		console.log(req.body.name);
		//Gaping security hole here, need to prevent password changing.
		/*
		console.log(User.find(req.body.name,function (err, docs) {
            if(err){
                console.log(err);
            }
            else return true;
		}));
		*/
		var u = new User(req.body);
		var d = new Date();
		
		u.month = d.getMonth();
		u.day = d.getDate();
		u.hr = d.getHours();
		u.min = d.getMinutes();
		
		u.save(function(err) {
			if (err) {
				next(err);
				return;
			}
			
			req.session.user = u.toObject();
			
			if(req.accepts('html')) {
				console.log('redirect');
				res.redirect(302, '/cmd');
			} else {
				console.log(u);
				res.json(201, u);
			}
		});
	});
	
	app.put("/user/:user", function(req, res, next) {
	    console.log("req.params.user:\n"+req.params.user);
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
	
	app.get('/logout', function(req, res, next) {
        //Check to see if user is logged in
        if(req.session.user !== undefined) {
            var id = req.session.user._id;
            var update = { $set: {month : "0", day : "0", hr : "0", min : "0"} };
            
            User.findByIdAndUpdate(id, update, function(err, user){
                if (err) {
                    console.log(err);
                    next(err);
                    return;
                }
                if(!user) {
                    res.send(404);
                    return;
                }
            });
            
            req.session = null;
            res.redirect('/');
        }
        else {
            res.redirect('/');
            console.log("Error: user is not logged in!");
        }
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
