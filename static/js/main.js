const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

const socket = io();

// Message from Server
socket.on('message', message => {
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
    <p class="meta">Username <span>TimeStamp</span></p>
    <p class="text">${message}</p>
  `;
  document.querySelector('.chat-messages').appendChild(div);
}