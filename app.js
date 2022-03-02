const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'static')));
botName = 'chrischatbot'

// Run on client connection
io.on('connection', socket => {
  // User connected
  socket.emit('message', formatMessage(botName, 'You\'re chatting!'))
  // Broadcast when user connects
  socket.broadcast.emit('message', formatMessage(botName, 'Someone has joined the chat'));
  // Run on client disconnection
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName, 'Someone left the chat'))
  })
  // Chat message listener
  socket.on('chatMessage', (msg) => {
    io.emit('message', formatMessage('USER', msg))
  })

})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));