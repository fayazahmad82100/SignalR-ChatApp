// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// chat.js
// Ensure DOM loaded (if script included at bottom of view this isn't necessary)
const userInput = document.getElementById("userInput");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messagesList = document.getElementById("messagesList");

// Build connection with automatic reconnect
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .withAutomaticReconnect()
    .build();

// Handle incoming messages from server
connection.on("ReceiveMessage", (user, message) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${message}`;
    messagesList.appendChild(li);
    // auto-scroll
    messagesList.scrollTop = messagesList.scrollHeight;
});

// Reconnect UI feedback
connection.onreconnecting((error) => {
    sendButton.disabled = true;
    const li = document.createElement("li");
    li.textContent = "Connection lost — attempting to reconnect...";
    messagesList.appendChild(li);
});

connection.onreconnected((connectionId) => {
    sendButton.disabled = false;
    const li = document.createElement("li");
    li.textContent = "Reconnected.";
    messagesList.appendChild(li);
});

// Start the connection (with retry)
async function start() {
    try {
        await connection.start();
        console.log("SignalR connected.");
        sendButton.disabled = false;
    } catch (err) {
        console.error("Failed to connect:", err);
        setTimeout(start, 2000);
    }
}
start();

// Send message (click or Enter)
sendButton.addEventListener("click", async () => {
    const user = userInput.value.trim();
    const message = messageInput.value.trim();
    if (!user || !message) return;
    try {
        await connection.invoke("SendMessage", user, message);
        messageInput.value = "";
        messageInput.focus();
    } catch (err) {
        console.error(err.toString());
    }
});

messageInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        sendButton.click();
    }
});

