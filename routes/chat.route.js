const express = require("express");
const app = express();
const router = express.Router();
const { join } = require("path");

router.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../index.html"));
});

router.get("/chatform", (req, res) => {
  res.sendFile(join(__dirname, "../chatform.html"));
});

router.get("/chatroom", (req, res) => {
  res.sendFile(join(__dirname, "../chatroom.html"));
});

module.exports = router;
