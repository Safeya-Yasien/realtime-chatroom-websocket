const socket = io();

const userNameInput = document.getElementById("username");
const roomSelect = document.getElementById("room");
const joinForm = document.getElementById("join-form");

joinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = userNameInput.value.trim();
  const room = roomSelect.value;

  if (!username) {
    alert("Please enter a username.");
    return;
  }

  if (!room) {
    alert("Please select a room.");
    return;
  }

  window.location.href = `/chatroom?username=${username}&room=${room}`;
});
