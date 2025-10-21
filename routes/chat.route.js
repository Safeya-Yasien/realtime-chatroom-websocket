const express = require("express");
const app = express();
const router = express.Router();
const { join } = require("path");

router.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../index.html"));
});

router.get("/chat", (req, res) => {
  res.sendFile(join(__dirname, "../chat.html"));
});

router.get("/chatroom", (req, res) => {
  res.sendFile(join(__dirname, "../chatRoom.html"));
});

module.exports = router;
