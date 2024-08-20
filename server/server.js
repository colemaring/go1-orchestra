const WebSocket = require("ws");
const express = require("express");
const app = express();
const port = 80;

app.use(express.static("dist"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
// websocket server
const wss = new WebSocket.Server({ port: 8080 });
//try 443?

let connectedClients = [];

// When a connection to a a client is established
wss.on("connection", (ws, req) => {
  const query = req.url.split("?")[1];
  const params = new URLSearchParams(query);
  const name = params.get("name");

  // Store the client name
  ws.clientName = name;

  // null name is broswer client, which shouldnt be added to list
  if (name != null || name == "") {
    if (!connectedClients.includes(name)) {
      connectedClients.push(name);
    }
    console.log(`Client connected: ${name}`);
  }

  // Set up ping interval
  const pingIntervalId = setInterval(() => {
    ws.ping();
    ws.pingTimeoutId = setTimeout(() => {
      if (
        ws.readyState === WebSocket.OPEN &&
        connectedClients.includes(ws.clientName)
      ) {
        // Client didn't respond to ping, remove from connected clients and terminate connection
        connectedClients = connectedClients.filter(
          (client) => client !== ws.clientName
        );
        console.log(`Client disconnected (unresponsive): ${ws.clientName}`);

        // Terminate all clients with the same name
        wss.clients.forEach((client) => {
          if (client.clientName === ws.clientName) {
            client.terminate();
          }
        });

        // Broadcast connected clients to all connected clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "connectedClients",
                clients: connectedClients,
              })
            );
          }
        });
        clearInterval(pingIntervalId); // Stop the ping interval
      }
    }, 2000);
  }, 1000);

  // Handle pong response
  ws.on("pong", () => {
    clearTimeout(ws.pingTimeoutId);
  });

  // Broadcast connected clients to all connected clients
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({ type: "connectedClients", clients: connectedClients })
      );
    }
  });

  // getConnectedClients asks for the list of connected clients, used when client opens connection
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.type === "getConnectedClients") {
      // Send the current list of connected rovers to the client
      ws.send(
        JSON.stringify({ type: "connectedClients", clients: connectedClients })
      );
    }
    if (data.type === "tilt") {
      // Relay the move message to the connected client
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ type: "tilt" }));
      });
    }
    if (data.type === "dance") {
      // Relay the move message to the connected client
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ type: "dance" }));
      });
    }
    if (data.type === "stop") {
      // Relay the move message to the connected client
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ type: "stop" }));
      });
    }
	if (data.type === "walkF") {
      // Relay the move message to the connected client
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ type: "walkF" }));
      });
    }
	if (data.type === "walkB") {
      // Relay the move message to the connected client
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ type: "walkB" }));
      });
    }
	if (data.type === "form1") {
      // Relay the move message to the connected client
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ type: "form1" }));
      });
    }
  });


  // Handle client disconnection
  ws.on("close", () => {
    // Remove client name from the array
    connectedClients = connectedClients.filter(
      (client) => client !== ws.clientName
    );
    console.log(`Client disconnected: ${name}`);
    console.log(`Connected clients: ${connectedClients}`);

    wss.clients.forEach((client) => {
      if (client.clientName === ws.clientName && client !== ws) {
        client.terminate();
      }
    });

    // Broadcast connected clients to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "connectedClients",
            clients: connectedClients,
          })
        );
      }
    });
  });

  // Handle client errors
  ws.on("error", (error) => {
    console.error("Client error:", error);
    // Remove client name from the array
    connectedClients = connectedClients.filter(
      (client) => client !== ws.clientName
    );
    console.log(`Connected clients: ${connectedClients}`);

    // Broadcast connected clients to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "connectedClients",
            clients: connectedClients,
          })
        );
      }
    });
  });
});

console.log("WebSocket server listening on port 8080");
