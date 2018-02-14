const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const PORT = 1337;
const app = express();

app.use(volleyball);
// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'src')));

app.use('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '..', 'static/index.html'));
  res.send();
});

// app.use((req, res, next) => {
//   if (path.extname(req.path).length) {
//     const err = new Error('Not found');
//     err.status = 404;
//     next(err);
//   } else {
//     next();
//   }
// });

const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));

const io = require('socket.io')(server);
require('./socket')(io);

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
