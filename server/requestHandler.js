var db = require('./db.js');
var request = require('request');
var User = require('./user.js');

module.exports= {

  createUser: function(req, res, next){
    console.log('hit createUser');
    console.log('username is ', req.body.username);
    var username = req.body.username;

    User.findOne({ username: username })
      .exec(function(err, user){
        if (!user){
          var newUser = new User({
            username: username
          });
          newUser.save(function(err, newUser){
            if(err){
              res.status(500).send(err);
              return;
            } else {
              console.log('new user created');
              res.status(201).send(newUser);
            }
          });
        } else {
          console.log('user already exists');
        }
      });
  }

};