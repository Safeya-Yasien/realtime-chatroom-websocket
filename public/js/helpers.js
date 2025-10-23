const messagesContainerElement = document.getElementById("messages");

const createMessageElement = (message) => {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.message}</p>
  `;
  return messageElement;
};

const appendMessageElement = (element) => {
  messagesContainerElement.appendChild(element);
  messagesContainerElement.scrollTop = messagesContainerElement.scrollHeight;
};
