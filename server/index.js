require('./config.js');
const express = require('express');
const compression = require('compression')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(compression())
app.use(express.static(path.resolve(__dirname, '../client')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

const io = require('socket.io').listen(app.listen(port, () => {
  console.log(`Magic happens on http://localhost:${port}`);
}));

io.sockets.on('connection', (socket) => {
  console.log('sockets connected');
  socket.emit('connected', {
    message: 'sockets connected',
    status: 200
  });
});

const services = require('./services')(io);
require('./routes.js')(app, services);


exports = module.exports = app;
process.on('uncaughtException', err => {
  console.log(err);
});
