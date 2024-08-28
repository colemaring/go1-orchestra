const WebSocket = require("ws");

const ws = new WebSocket("ws:/143.244.157.174:8080?name=superman");

ws.on("open", () => {
  console.log("Connected to the WebSocket server");
  ws.send(JSON.stringify({ type: "getConnectedClients" }));
});

ws.on("message", (message) => {
  console.log(`Received message from server: ${message}`);
});
