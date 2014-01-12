var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Types = Mongoose.Types;

var sActiveUsers = new Schema({
    id : [String]
});

var mActiveUsers = Mongoose.model('activeUsers', sActiveUsers);
module.exports  = mActiveUsers;