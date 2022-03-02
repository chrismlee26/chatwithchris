const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, getRoomUsers, userLeave } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'static')));

botName = 'chrischatbot'

// Run on client connection
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, chatroom }) => {
    const user = userJoin(socket.id, username, chatroom)

    socket.join(user.chatroom)

    // User connected
    socket.emit('message', formatMessage(botName, 'You\'re chatting!'))

    // Broadcast when user connects
    socket.broadcast
      .to(user.chatroom)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );
    // Send users and room info
    io.to(user.chatroom).emit('roomUsers', {
      chatroom: user.chatroom,
      users: getRoomUsers(user.chatroom)
    });
  });

  // Chat message listener
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.chatroom).emit('message', formatMessage(user.username, msg))
  });

  // Run on client disconnection
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.chatroom).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.chatroom).emit('roomUsers', {
        chatroom: user.chatroom,
        users: getRoomUsers(user.chatroom)
      });
    }

  });
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));