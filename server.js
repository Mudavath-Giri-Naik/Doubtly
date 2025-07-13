const express = require('express');
const cors = require('cors');
const { WebSocketServer } = require('ws');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// In-memory store
const rooms = {};

// Create room
app.post('/api/create-room', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Name and valid email required' });
  }
  let code;
  do {
    code = Math.random().toString(36).substring(2, 8).toUpperCase();
  } while (rooms[code]);
  rooms[code] = {
    admin: { name, email },
    users: [{ name, email, isAdmin: true }],
    messages: [],
    sockets: [],
  };
  res.json({ code });
});

// Join room
app.post('/api/join-room', (req, res) => {
  const { name, email, code } = req.body;
  if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Name and valid email required' });
  }
  if (!rooms[code]) {
    return res.status(404).json({ error: 'Room not found' });
  }
  rooms[code].users.push({ name, email, isAdmin: false });
  res.json({ success: true });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// WebSocket for chat
const wss = new WebSocketServer({ server });
wss.on('connection', (ws, req) => {
  let roomCode, user;
  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);
      if (data.type === 'join') {
        roomCode = data.code;
        user = { name: data.name, email: data.email };
        if (!rooms[roomCode]) {
          ws.send(JSON.stringify({ type: 'error', error: 'Room not found' }));
          ws.close();
          return;
        }
        rooms[roomCode].sockets.push(ws);
        ws.send(JSON.stringify({ type: 'init', messages: rooms[roomCode].messages, users: rooms[roomCode].users }));
      } else if (data.type === 'message') {
        if (!rooms[roomCode]) return;
        const message = { name: user.name, email: user.email, text: data.text, timestamp: Date.now() };
        rooms[roomCode].messages.push(message);
        rooms[roomCode].sockets.forEach(s => s.send(JSON.stringify({ type: 'message', message })));
      } else if (data.type === 'end') {
        if (rooms[roomCode] && rooms[roomCode].admin.email === user.email) {
          rooms[roomCode].sockets.forEach(s => s.send(JSON.stringify({ type: 'ended' })));
          rooms[roomCode].sockets.forEach(s => s.close());
          delete rooms[roomCode];
        }
      } else if (data.type === 'leave') {
        ws.close();
      }
    } catch {}
  });
  ws.on('close', () => {
    if (roomCode && rooms[roomCode]) {
      rooms[roomCode].sockets = rooms[roomCode].sockets.filter(s => s !== ws);
    }
  });
}); 