var mongoose = require('mongoose');
var db = require('./db.js');

var User = mongoose.Schema({
  username: {type: String, required: true}
});

var Users = mongoose.model('User', User);

module.exports = Users;