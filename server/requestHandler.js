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
    console.log('hit createUser');
    console.log('username is ', req.body.username);

    var username = req.body.username;
    var ipAddress = ip.address();
    username = username + '.' + ipAddress;

    req.session.user = username;
    activeUser = username;
    console.log('req session user is ', req.session.user);

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
            console.log('new user created');

            res.status(201).send(newUser);

          });
        } else {
          console.log('user already exists: ', user);
          res.status(200).send(user);
        }

      });


  },

  createMessage: function(req, res, next){
    console.log('message is ', req.body.message);
    console.log('user is ', req.session.user);
    var username = req.session.user;
    var msg = req.body.message;

    var newMessage = new Chat({
      message: msg,
      username: username
    });

    newMessage.save(function(err, newMsg){
      if(err){
        res.status(500).send(err);
        return;
      } else {
        console.log('new message inserted');
        res.status(201).send(newMsg);
      }
    });

  },

  getMessages: function(req, res, next){

    Chat.find()
    .sort('-updatedAt')
    .limit(10)
    .exec(function(err, data){
      if(err){
        res.status(500).send(err);
      }
      console.log('chats are ', data);
      res.status(200).send(data);
    });
  },

  connectLinkedIn: function(req, res, next){

    LinkedIn.auth.authorize(res, scope);

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
            console.log('profile is ', profile);


            User.findOne({username: activeUser})
              .exec(function(err, user){
                if(err){
                  return console.error(err);
                }
                req.session.user = activeUser;
                user.linkedin = profile;
                user.save(function(err, usr){
                  console.log('updated user is ', usr);
                });
              });
        });
        return res.redirect('/');
    });

  }




};