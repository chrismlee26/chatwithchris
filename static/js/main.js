const chatForm = document.getElementById('chat-form')

const socket = io();

// Message from Server
socket.on('message', message => {
  outputMessage(message)
  // console.log(message)
})

// Submit Message from Client
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value // Get Message Text
  // Emit message to Server
  socket.emit('chatMessage', msg)
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