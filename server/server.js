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
  // to the sender
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().toString()
  });

  // to the other users
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().toString()
  });

  // socket.emit('newMessage', {
  //   from: 'kelvin.elechukwu@gmail.com',
  //   text: 'Hey, how are you doing?',
  //   createdAt: new Date().toString()
  // });

  socket.on('createMessage', function(message) {
    console.log('create message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().toString()
    });
  });
  // socket.emit('newEmail', {
  //   from: 'joseph@gmail.com',
  //   message: 'Message from Joseph',
  //   received: new Date().toString()
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
