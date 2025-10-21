require("dotenv").config();
const express = require("express");
const app = express();
const { join } = require("path");

const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.use("/", require("./routes/chat.route"));





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
