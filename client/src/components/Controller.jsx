import React from "react";
import Button from "react-bootstrap/Button";

function Controller({ ws }) {
  const handleDance1 = () => {
    console.log("Dance 1 button clicked");
    ws.send(
      JSON.stringify({ type: "dance1" })
      //   JSON.stringify({type: "dance1", direction: "forward" })
    );
  };

  const handleDance2 = () => {
    console.log("Dance 2 button clicked");
    ws.send(JSON.stringify({ type: "dance2" }));
  };

  const handleStop = () => {
    console.log("Stop button clicked");
    ws.send(JSON.stringify({ type: "stop" }));
  };

  return (
    <div className="controller">
      <Button onClick={handleDance1}>Move 1</Button>
      <Button onClick={handleDance2}>Move 2</Button>
      <Button onClick={handleStop} variant="danger">
        Stop
      </Button>
    </div>
  );
}

export default Controller;
