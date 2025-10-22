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

roomNameElement.textContent = ` Room: ${roomName}`;

const socket = io();

socket.emit("joinRoom", { username: userName, room: roomName });

socket.on("joinRoom", ({ username, room }) => {
  console.log(`${username} has joined the room: ${room}`);
  const userElement = document.createElement("li");
  userElement.textContent = username;
  usersListElement.appendChild(userElement);
  usersListElement.scrollTop = usersListElement.scrollHeight;
});

messageFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  //   send event to server called message with the message content
  socket.emit("message", { message, userName, roomName });
});

socket.on("message", ({ message, userName }) => {
  userNameElement.textContent = userName;
  messageTimeElement.textContent = new Date().toLocaleTimeString();

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

// emit means send data to the server

/**
 * when the user enter the room send welcome message with username with time of entering
 * when the user send message appears on all users screens with username and time of sending
 * after the user click on send empty the input field
 * add the message to screen or chat to appears in html page
 * send welcome message to the user when he enter the room for the first time or refresh the page or re-enter the room
 */

// on means receive data from the server
