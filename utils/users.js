const users = [];

// Join user to chat
function userJoin(id, username, chatroom) {
  const user = { id, username, chatroom };
  users.push(user)
  return user
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  getRoomUsers,
}