var mongoose = require('mongoose');

var uriString = process.env.MONGOLAB_URI || 'mongodb://localhost/webchatdb';

mongoose.connect(uriString);
var db = mongoose.connection;

db.once('open', function(){
  console.log("we're connected!");
});
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;