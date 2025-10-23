const moment = require("moment");

const addMessage = (message, username) => {
  return {
    id: Date.now(),
    username,
    message,
    time: moment().format("h:mm A"),
  };
};

module.exports = {
  addMessage,
};
