var mongoose = require('mongoose');
var db = require('./db.js');

var Chat = mongoose.Schema({
  username: {type: String, required: true},
  message: {type: String, required: true}
});

var Chats = mongoose.model('Chat', Chat);


module.exports = Chats;