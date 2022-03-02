const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

let params = new URLSearchParams(document.location.search);
let username = params.get("username");
let chatroom = params.get("room");

// let { usersName, roomsName } = new URLSearchParams(document.location.search);

const socket = io();

// // Join ChatRoom
socket.emit('joinRoom', { username, chatroom })

// Message from Server
socket.on('message', message => {
  console.log(message)
  outputMessage(message)
  chatMessages.scrollTop == chatMessages.scrollHeight // Scroll to newest
})

// Submit Message from Client
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value // Get Message Text
  socket.emit('chatMessage', msg) // Emit message to Server
  e.target.elements.msg.value = '' // Reset chat input after submit
  e.target.elements.msg.focus();
})

// Output Message to DOM
function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message');
  div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>
  `;
  document.querySelector('.chat-messages').appendChild(div);
}