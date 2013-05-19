var User = require('../model/user');

exports.create = function(app) {
	app.get('/', function(req, res, next) {
		res.render('index.html');
	});
};
