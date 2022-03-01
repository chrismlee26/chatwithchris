const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'static')));

// Run on client connection
io.on('connection', socket => {
  // User connected
  socket.emit('message', 'You\'re chatting!')
  // Broadcast when user connects
  socket.broadcast.emit('message', 'Someone has joined the chat');
  // Run on client disconnection
  socket.on('disconnect', () => {
    io.emit('message', 'Someone left the chat')
  })
  // Chat message listener
  socket.on('chatMessage', (chatMsg) => {
    io.emit('message', chatMsg)
  })

})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));