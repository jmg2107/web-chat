var requestHandler = require('./requestHandler.js');

module.exports = function(app, express){
  app.post('/api/createUser', requestHandler.createUser);

  app.post('/api/createMessage', requestHandler.createMessage);

  app.get('/api/getMessages', requestHandler.getMessages);

  app.get('/api/LinkedIn', requestHandler.connectLinkedIn);

  app.get('/redirect', requestHandler.redirectLinkedIn);
}