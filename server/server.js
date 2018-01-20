const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'john.maduka@yahoo.com',
    text: 'Hey. Na here we dey.',
    createdAt: new Date()
  });

  // socket.emit('newEmail', {
  //   from: 'joe@example.com',
  //   text: 'Hey. What is going on?',
  //   createdAt: 123
  //});

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
