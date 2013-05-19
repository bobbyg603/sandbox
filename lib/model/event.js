var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Types = Mongoose.Types;

var sEvent = new Schema({
	reason : String,
	type : String,
	public : Boolean,
	address : String,
	date : Date,
	note : String
});

var mEvent = Mongoose.model('event', sEvent);
module.exports  = mEvent;
