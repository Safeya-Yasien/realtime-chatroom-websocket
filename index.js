require("dotenv").config();
const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const {
  addUser,
  getUsersRoom,
  getUserById,
  removeUser,
} = require("./utils/users");
const { addMessage } = require("./utils/messages");

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.use("/", require("./routes/chat.route"));

const handleUserLeave = (socket) => {
  const user = getUserById(socket.id);
  if (!user) return;

  socket.leave(user.room);
  removeUser(socket.id);

  socket.broadcast
    .to(user.room)
    .emit(
      "userLeave",
      addMessage(`${user.username} has left the chat`, "ChatBot")
    );

  io.to(user.room).emit("users", getUsersRoom(user.room));
};

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    addUser({ id: socket.id, username, room });
    socket.join(room);

    io.to(room).emit("users", getUsersRoom(room));

    // Send welcome message to the user
    socket.emit(
      "message",
      addMessage(`Welcome to the chat room: ${room}, ${username}!`, "ChatBot")
    );

    // Broadcast to other users in the room that a new user has joined
    socket.broadcast
      .to(room)
      .emit(
        "message",
        addMessage(`${username} has joined the chat`, "ChatBot")
      );
  });

  socket.on("typing", () => {
    const user = getUserById(socket.id);
    if (!user) return;

    socket.broadcast.to(user.room).emit("typing", { username: user.username });
  });

  socket.on("stopTyping", () => {
    const user = getUserById(socket.id);
    if (!user) return;
    socket.broadcast
      .to(user.room)
      .emit("stopTyping", { username: user.username });
  });

  // Listen for 'message' events from clients
  socket.on("message", ({ message }) => {
    const user = getUserById(socket.id);
    if (!user || !message.trim()) return;
    io.to(user.room).emit("message", addMessage(message, user.username));
  });

  socket.on("leaveRoom", () => handleUserLeave(socket));

  socket.on("disconnect", () => handleUserLeave(socket));
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
