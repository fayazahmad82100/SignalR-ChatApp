# SignalR ChatApp

A **real-time chat application** built with **ASP.NET Core MVC** and **SignalR**.  
This project demonstrates how to use **SignalR hubs** to enable instant, bi-directional communication between server and multiple clients without requiring page refreshes or polling.  

---

## Features
- Real-time messaging between multiple clients (no refresh needed)
- User-friendly MVC interface
- Broadcast messages to all connected users
- Works locally, over LAN, or deployable online
- Easily extendable to support:
  - Private 1-to-1 messages
  - Chat groups/rooms
  - Persistent chat history (database)

---

## Tech Stack
- **Backend:** ASP.NET Core 6/7 MVC  
- **Real-time communication:** SignalR  
- **Frontend:** Razor Views, JavaScript  
- **Client Library:** @microsoft/signalr (JS client)  

---

## Project Structure
```
ChatApp/
│
├── Controllers/
│   └── HomeController.cs
│
├── Hubs/
│   └── ChatHub.cs
│
├── Views/
│   └── Home/
│       └── Index.cshtml
│
├── wwwroot/
│   └── js/
│       └── chat.js
│
├── Program.cs
└── README.md
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/fayazahmad82100/SignalR-ChatApp.git
cd SignalR-ChatApp
```

### 2. Install dependencies
```bash
dotnet restore
```

### 3. Run the application
```bash
dotnet run
```

By default, it will be available at:  
- `https://localhost:5001`  
- `http://localhost:5000`

---

## Usage
1. Open the app in **two different browser tabs** (or devices on the same network).  
2. Enter your name and type a message.  
3. Send → The message instantly appears in all connected clients.  

 Example workflow:
- User1 (Chrome): enters `Hello!`  
- User2 (Edge): instantly sees `User1: Hello!`  

---

## Run on Local Network
To allow others on your Wi-Fi/LAN to join:  

Run with:
```bash
dotnet run --urls "http://0.0.0.0:5000"
```

Find your local IP (e.g., `192.168.1.10`) and share:
```
http://192.168.1.10:5000
```

---

## Extend the Project
- **Private Messaging** → Use connection IDs or user mappings.  
- **Groups/Rooms** → Use `Groups.AddToGroupAsync` in SignalR.  
- **Chat History** → Store messages in a database (SQL Server, SQLite, etc).  
- **Authentication** → Integrate ASP.NET Identity for secure user sessions.  

---

## How SignalR Works
1. Client connects to `/chathub`.  
2. User sends a message → calls server Hub method `SendMessage`.  
3. Server broadcasts via `Clients.All.SendAsync("ReceiveMessage")`.  
4. All clients instantly update their chat UI.  

---

## Screenshot (Optional)
> ![Chat Screenshot](SignalR-ChatApp.jpg)

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to add.  

---
