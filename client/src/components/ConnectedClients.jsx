import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const ConnectedClients = ({ ws }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Send a message to the WebSocket server to retrieve the current list of connected rovers
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "getConnectedClients" }));
    };

    // Handle incoming messages
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "connectedClients") {
        setClients(data.clients);
        console.log(`Connected clients: ${data.clients}`);
      }
    };

    // Handle connection error
    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
    };
  }, []);

  return (
    <div>
      <h1>Online Go1s:</h1>
      <Table
        striped
        bordered
        hover
        style={{ maxWidth: "50rem", margin: "0 auto" }} // Inline CSS
      >
        <thead>
          <tr>
            <th>Go1</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ConnectedClients;
