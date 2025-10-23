const queryString = window.location.search;
const urlSearchParams = new URLSearchParams(queryString);

const userName = urlSearchParams.get("username");
const roomName = urlSearchParams.get("room");

const roomNameElement = document.getElementById("room-name");
const messageInput = document.getElementById("message-input");
const typingIndicatorElement = document.getElementById("typing-indicator");
const usersListElement = document.getElementById("users");
const messageFormElement = document.getElementById("message-form");
const leaveBtnElement = document.getElementById("leave-btn");

roomNameElement.textContent = ` Room: ${roomName}`;

const socket = io();

socket.emit("joinRoom", { username: userName, room: roomName });

messageInput.addEventListener("input", () => {
  socket.emit("typing");

  const typingTimer = setTimeout(() => {
    socket.emit("stopTyping");
    clearTimeout(typingTimer);
  }, 2000);
});

socket.on("typing", ({ username }) => {
  typingIndicatorElement.textContent = `${username} is typing...`;
  typingIndicatorElement.classList.add("active");
});

socket.on("stopTyping", () => {
  typingIndicatorElement.textContent = "";
  typingIndicatorElement.classList.remove("active");
});

socket.on("users", (users) => {
  usersListElement.innerHTML = "";
  users.forEach((user) => {
    const userElement = document.createElement("li");
    userElement.textContent = user.username;
    usersListElement.appendChild(userElement);
    usersListElement.scrollTop = usersListElement.scrollHeight;
  });
});

messageFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();
  if (!message) return;

  socket.emit("message", { message });
});

socket.on("message", (message) => {
  const messageElement = createMessageElement(message);
  appendMessageElement(messageElement);
  messageFormElement.reset();
});

// leave room
leaveBtnElement.addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");

  if (leaveRoom) {
    socket.emit("leaveRoom");

    setTimeout(() => {
      window.location.href = `/chatform`;
    }, 1000);
  }
});

socket.on("userLeave", (message) => {
  const messageElement = createMessageElement(message);
  appendMessageElement(messageElement);
});
