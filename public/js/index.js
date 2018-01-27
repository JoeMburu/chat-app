var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.on('newMessage', function(newMessage) {
    console.log('Got new message', newMessage);
  });

  // socket.emit('createEmail', {
  //   to: 'jen@example.com',
  //   text: 'Hey. This is Andrew.'
  // });
});

// socket.emit('createMessage', {
//   from: 'chika@gmail.com',
//   text: 'Man pass man'
// });

socket.on('disconnect', function() {
  console.log('Disconnected from the server');
});

// socket.on('newEmail', function(email) {
//   console.log('New email', email);
// });
