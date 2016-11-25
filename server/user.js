var mongoose = require('mongoose');
var db = require('./db.js');

var User = mongoose.Schema({
  username: {type: String, required: true},
  linkedin: {type: {}, required: false}
});

var Users = mongoose.model('User', User);


module.exports = Users;