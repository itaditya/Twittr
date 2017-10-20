const path = require('path');
const _ = require('lodash');

module.exports = (app, services) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client', 'index.html'));
  });

  app.post('/tweet', (req, res) => {
    const content = _.pick(req.body, ['status']);
    res.send('Not so fast buddy');
    // services.postUpdate(content, (data) => {
    //   res.send(data);
    // })
  })
}
