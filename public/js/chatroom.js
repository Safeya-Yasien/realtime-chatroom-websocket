const queryString = window.location.search;
const urlSearchParams = new URLSearchParams(queryString);

const userName = urlSearchParams.get("username");
const roomName = urlSearchParams.get("room");

const roomNameElement = document.getElementById("room-name");
const usersListElement = document.getElementById("users");
const messageFormElement = document.getElementById("message-form");
const messagesContainerElement = document.getElementById("messages");
const userNameElement = document.getElementById("user-name");
const messageTimeElement = document.getElementById("message-time");
const leaveBtnElement = document.getElementById("leave-btn");

roomNameElement.textContent = ` Room: ${roomName}`;

const socket = io();

socket.emit("joinRoom", { username: userName, room: roomName });

socket.on("users", (users) => {
  usersListElement.innerHTML = "";
  for (const user in users) {
    const userElement = document.createElement("li");
    userElement.textContent = users[user].username;
    usersListElement.appendChild(userElement);
    usersListElement.scrollTop = usersListElement.scrollHeight;
  }
});

messageFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  socket.emit("message", { message });
});

socket.on("message", ({ message, userName }) => {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `
    <p class="meta">${userName} <span>${new Date().toLocaleTimeString()}</span></p>
    <p class="text">${message}</p>
  `;
  messagesContainerElement.appendChild(messageElement);
  messagesContainerElement.scrollTop = messagesContainerElement.scrollHeight;
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

socket.on("userLeave", ({ message, userName }) => {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `
    <p class="meta">${userName} <span>${new Date().toLocaleTimeString()}</span></p>
    <p class="text">${message}</p>
  `;
  messagesContainerElement.appendChild(messageElement);
  messagesContainerElement.scrollTop = messagesContainerElement.scrollHeight;
});
