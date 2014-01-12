var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Types = Mongoose.Types;

var sUser = new Schema({
	name : String,
	hash : String,
	salt : String,
	month: String,
	day  : String,
	hr   : String,
	min  : String
});

sUser.virtual('password').set(function(pass) {
	this.hash = pass;
});

var mUser = Mongoose.model('user', sUser);
module.exports  = mUser;