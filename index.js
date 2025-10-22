require("dotenv").config();
const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.use("/", require("./routes/chat.route"));

io.on("connection", (socket) => {
  // Listen for 'joinRoom' events from clients
  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);

    // Send welcome message to the user
    socket.emit("message", {
      message: `Welcome to the chat room: ${room}, ${username}!`,
      userName: "ChatBot",
    });

    // Broadcast to other users in the room that a new user has joined
    socket.broadcast.to(room).emit("message", {
      message: `${username} has joined the chat`,
      userName: "ChatBot",
    });

    // Listen for 'message' events from clients
    socket.on("message", ({ message, userName }) => {
      io.to(room).emit("message", { message, userName });
    });
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
