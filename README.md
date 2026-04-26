# SSE Model – Real-Time Event Streaming System 

A backend-focused project that demonstrates how **Server-Sent Events (SSE)** can be used to build real-time communication between a server and multiple clients.

This project explores how servers can continuously push updates to connected clients over a single HTTP connection without requiring constant polling.

---

## Project Overview

Traditional applications often use repeated API requests (polling) to check for updates, which increases server load and creates delays.

This project solves that problem by implementing:

- **Server-Sent Events (SSE)** for one-way real-time communication  
- Persistent HTTP connection between client and server  
- Instant event updates from server to connected clients  
- Lightweight architecture compared to WebSockets for specific use cases  

The goal of this project was to understand how SSE works as a real-time communication model and where it can be applied in modern applications.

---

## Features

✅ Real-time server-to-client communication  
✅ Persistent HTTP connection  
✅ Live event updates  
✅ Lightweight architecture  
✅ Reduced API polling  
✅ Event streaming implementation  
✅ Multiple client support  
✅ Backend event broadcasting  
✅ Error handling  

---

## Tech Stack

### Backend
- Node.js  
- Express.js  

### Communication
- Server-Sent Events (SSE)

### Tools
- Git  
- GitHub  
- Postman  
- VS Code  

---

## How It Works

### Step 1: Client Connects
The client opens an SSE connection with the server.

```bash
GET /events
