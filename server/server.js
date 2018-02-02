const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var favicon = require('serve-favicon');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname,'../public','images','favicon.ico')));

io.on('connection', (socket) => {
  console.log('New user connected');
  // to the sender
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // to the other users
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', function(message, callback) {
    console.log('create message', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    // io.emit('newMessage',
    // generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
