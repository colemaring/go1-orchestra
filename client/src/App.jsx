import "./App.css";
import Controller from "./components/Controller";
import ConnectedClients from "./components/ConnectedClients";

function App() {
  // Establish WebSocket connection
  const wsUrl = "ws://localhost:8080";
  const ws = new WebSocket(wsUrl);

  return (
    <>
      <ConnectedClients ws={ws} />
      <Controller ws={ws} />
    </>
  );
}

export default App;
