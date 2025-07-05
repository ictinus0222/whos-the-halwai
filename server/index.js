const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const rooms = {};

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("createRoom", ({ hostName, maxPlayers }) => {
    const roomId = Math.random().toString(36).substr(2, 6).toUpperCase();
    rooms[roomId] = { players: [{ id: socket.id, name: hostName }], maxPlayers, hostId: socket.id };
    socket.join(roomId);
    socket.emit("roomCreated", { roomId });
  });

  socket.on("joinRoom", ({ roomCode, playerName }) => {
    const room = rooms[roomId];
    if (room && room.players.length < room.maxPlayers) {
      room.players.push({ id: socket.id, name: playerName });
      socket.join(roomId);
      io.to(roomId).emit("playerListUpdate", { players: room.players });
      socket.emit("roomJoined", { roomId });
    } else {
      socket.emit("error", "Room not found or full");
    }
  });

  socket.on("startGame", ({ roomId }) => {
    const room = rooms[roomId];
    if (!room) return;

    const spyIndex = Math.floor(Math.random() * room.players.length);
    const secretWord = "Pizza";  // Example word

    room.players.forEach((player, index) => {
      const role = index === spyIndex ? "Spy" : "Player";
      io.to(player.id).emit("gameStarted", { role, secretWord: role === "Player" ? secretWord : null });
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    // Handle disconnects if needed
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
