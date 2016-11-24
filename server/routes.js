var requestHandler = require('./requestHandler.js');

module.exports = function(app, express){
  app.post('/api/createUser', requestHandler.createUser);
}