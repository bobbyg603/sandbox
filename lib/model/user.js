var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Types = Mongoose.Types;

var sUser = new Schema({
	name : String,
	hash : String,
	salt : String,
	calendars : [ Types.ObjectID ]
});

var mUser = Mongoose.model('user', sUser);
module.exports  = mUser;
