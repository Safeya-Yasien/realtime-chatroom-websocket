const moment = require("moment");

const addMessage = (message, userName) => {
  return {
    userName,
    message,
    time: moment().format("h:mm A"),
  };
};

module.exports = {
  addMessage,
};
