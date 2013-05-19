var EJS = require('ejs');
var Express = require('express');
var HTTP = require('http');
var Mongoose = require('mongoose');
var Path = require('path');

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

// app.use(app.router);

ccUser.create(app);
ccView.create(app);

Mongoose.connect("mongodb://127.0.0.1/hackapp");
Mongoose.connection.once('open', function() {
	console.log("Connected to MongoDB");
	server.listen(9001, function() {
		console.log("Listening on port 9001");
	});
});
