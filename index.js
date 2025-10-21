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
  console.log("a user connected");

  console.log("Socket ID:", socket.id);
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
