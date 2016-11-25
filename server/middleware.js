var bodyParser = require('body-parser');
var session = require('client-sessions');

module.exports = function (app, express){
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({
    cookieName: 'session',
    secret: 'secret bear',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }));
  app.use(express.static('client'));

};