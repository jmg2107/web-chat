var db = require('./db.js');
var request = require('request');
var ip = require('ip');
var User = require('./user.js');
var Chat = require('./chats.js');

if(process.env.PORT){
  var linkedInKey = process.env.LINKEDIN_KEY;
  var linkedInSecret = process.env.LINKEDIN_SECRET;
  var host = 'https://web-chat-challenge.herokuapp.com/';
} else {
  var linkedInKey = require('./config.js').key;
  var linkedInSecret = require('./config.js').secret;
  var host = 'http://localhost:3000/';
}

var scope = ['r_basicprofile'];
var redirect = host + 'redirect';
var LinkedIn = require('node-linkedin')(linkedInKey, linkedInSecret, redirect);
var activeUser;

module.exports= {

  createUser: function(req, res, next){

    var username = req.body.username;
    var ipAddress = ip.address();
    username = username + '.' + ipAddress;

    req.session.user = username;
    activeUser = username;

    var newUser = new User({
      username: username
    });

    User.findOne({username: username})
      .exec(function(err, user){
        if(!user){
          newUser.save(function(err, newUser){

            if(err){
              res.status(500).send(err);
              return;
            }

            res.status(201).send(newUser);

          });
        } else {
          res.status(200).send(user);
        }

      });


  },

  createMessage: function(req, res, next){

    var username = req.session.user;
    var msg = req.body.message;

    User.findOne({username: username})
      .exec(function(err, user){
        var profile = undefined;
        if(user.linkedin){
          profile = user.linkedin.pictureUrl;
        }
        var newMessage = new Chat({
          message: msg,
          username: username,
          linkedIn: profile
        });
        newMessage.save(function(err, newMsg){
          if(err){
            res.status(500).send(err);
            return;
          } else {
            res.status(201).send(newMsg);
          }
        });
      });

  },

  getMessages: function(req, res, next){

    Chat.find()
    .sort('-created_at')
    .limit(10)
    .exec(function(err, data){
      if(err){
        res.status(500).send(err);
      }
      res.status(200).send(data);
    });
  },

  connectLinkedIn: function(req, res, next){

    var auth_url = LinkedIn.auth.authorize(scope);

    res.status(200).send(auth_url);

  },

  redirectLinkedIn: function(req, res, next){

    LinkedIn.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
        if ( err ){
          return console.error(err);
        }

        console.log(results);
        var linkedin = LinkedIn.init(results.access_token);

        linkedin.people.me(function(err, profile) {
            // Loads the profile of access token owner.

            User.findOne({username: activeUser})
              .exec(function(err, user){
                if(err){
                  return console.error(err);
                }
                req.session.user = activeUser;
                user.linkedin = profile;
                user.save(function(err, usr){
                });
              });

            return res.redirect('/');
        });
    });

  }




};