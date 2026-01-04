const express = require("express");
const path = require("path");
const app = express();

// Store active SSE connections
let clients = [];

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// SSE endpoint for clients
app.get("/events", (req, res) => {
  // Set required SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Add client to active connections
  const clientId = Date.now();
  const client = { id: clientId, res };
  clients.push(client);

  console.log(`Client ${clientId} connected. Total clients: ${clients.length}`);

  // Send welcome message
  res.write(`data: Connected to broadcast server\n\n`);

  // Handle client disconnect
  req.on("close", () => {
    clients = clients.filter(c => c.id !== clientId);
    console.log(`Client ${clientId} disconnected. Total clients: ${clients.length}`);
    res.end();
  });
});

// Admin endpoint to broadcast messages
app.post("/broadcast", (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Broadcast to all connected clients
  const timestamp = new Date().toLocaleTimeString();
  const broadcastMessage = `[${timestamp}] ${message}`;
  
  clients.forEach(client => {
    try {
      client.res.write(`data: ${broadcastMessage}\n\n`);
    } catch (error) {
      console.log(`Error sending to client ${client.id}:`, error.message);
    }
  });

  console.log(`Broadcasted to ${clients.length} clients: ${message}`);
  res.json({ success: true, clientCount: clients.length, message: broadcastMessage });
});

// Admin panel route
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`SSE Broadcast server running on port ${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
