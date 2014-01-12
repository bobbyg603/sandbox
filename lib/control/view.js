var User = require('../model/user');

exports.create = function(app) {
	app.get('/', function(req, res, next) {
		res.render('index.html');
	});
	
	app.get('/cmd', function(req, res, next) {
		res.locals.session = req.session || {};
		res.render('cmd.html');
	});
	
	app.get('/signup', function(req, res, next) {
		res.render('user/create.html');
	});
	
	app.post('/login', function(req, res, next) {
        //Set the login time, used to determine order
        var d = new Date();
		var month = d.getMonth();
		var day = d.getDate();
		var hr = d.getHours();
		var min = d.getMinutes();
		
		//Used to update the db entry
		var update = { $set : { month : month, day : day, hr : hr, min : min} };
		var id;
		
		//Login
		User.findOne({ name : req.body.name }, function(err, user) {
			if(err) {
				next(err);
				return;
			}
			
			if(!user) {
				res.redirect('/');
				return;
			}
			
			//Set the session user and id used for db update
			req.session.user = user;
			id = req.session.user._id;
			
			//Update the login time
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
            
            //Redirect to the command page
			res.redirect('/cmd');
		});
	});
	
	app.get('/voice', function(req, res, next) {
		req.session = null;
		res.render('voice.html');
	});
	
	/*
	app.get('/logout', function(req, res, next) {
		req.session = null;
		res.redirect('/');
	});
	*/
};
