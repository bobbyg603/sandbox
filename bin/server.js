var EJS = require('ejs');
var Express = require('express');
var HTTP = require('http');
var Mongoose = require('mongoose');
var Path = require('path');
var Util = require('util')
var ccUser = require('../lib/control/user');
var ccView = require('../lib/control/view');

var app = Express();
var server = HTTP.createServer(app);

Mongoose.connection.on('error', function(err) {
	if (err.message.match(/failed to connect/i)) {
		Util.log("Unable to connect to MongoDB. Shutting Down.");
		process.exit();
	}

	Util.log("Mongoose Connection Error");
	Util.puts(Util.inspect(err, true, null, true));

	if (err.stack)
		console.log(err.stack);
});

app.engine('html', EJS.renderFile);
app.set('views', Path.resolve(__dirname, "../view"));
app.use(Express.bodyParser());
app.use(Express.methodOverride('method'));
app.use(Express.cookieParser("afa8s7dfoasdfm"));
app.use(Express.cookieSession());
app.use(app.router);
app.use(Express['static'](Path.resolve(__dirname, '../static')))

ccUser.create(app);
ccView.create(app);

Mongoose.connect("mongodb://admin:5678b9@dharma.mongohq.com:10042/goddard");
Mongoose.connection.once('open', function() {
	console.log("Connected to MongoDB");
	server.listen(process.env.PORT, function() {
		console.log("Listening on port " + process.env.PORT);
	});
});
