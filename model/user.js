var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
	id: Number,
	name: String,
	age: Number,
	position: String
});

module.exports = mongoose.model('users', UserSchema);