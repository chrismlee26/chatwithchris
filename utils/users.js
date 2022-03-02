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

module.exports = {
  userJoin,
  getCurrentUser,
}