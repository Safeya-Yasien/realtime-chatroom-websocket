let users = [];

const addUser = ({ id, username, room }) => {
  users.push({ id, username, room });
  return users;
};

const getUsersRoom = (room) => {
  return users.filter((user) => user.room === room);
};

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
  return users;
};

module.exports = {
  addUser,
  getUsersRoom,
  getUserById,
  removeUser,
};
