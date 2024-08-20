import React from "react";
import Button from "react-bootstrap/Button";

function Controller({ ws }) {
  const handleTilt = () => {
    console.log("Tilt button clicked");
    ws.send(
      JSON.stringify({ type: "tilt" })
      //   JSON.stringify({type: "dance1", direction: "forward" })
    );
  };

  const handleDance = () => {
    console.log("Dance button clicked");
    ws.send(JSON.stringify({ type: "dance" }));
  };

  const handleStop = () => {
    console.log("Stop button clicked");
    ws.send(JSON.stringify({ type: "stop" }));
  };

  const handleWalkForwards = () => {
    console.log("Walk forwards button clicked");
    ws.send(JSON.stringify({ type: "walkF" }));
  };

  const handleWalkBackwards = () => {
    console.log("Walk backwards button clicked");
    ws.send(JSON.stringify({ type: "walkB" }));
  };

  const handleFormation1 = () => {
    console.log("Formation 1 button clicked");
    ws.send(JSON.stringify({ type: "form1" }));
  };

  return (
    <div className="controller">
      <Button onClick={handleTilt}>Tilt</Button>
      <Button onClick={handleFormation1}>Formation 1</Button>
      <Button onClick={handleWalkForwards}>Walk forwards</Button>
      <Button onClick={handleWalkBackwards}>Walk backwards</Button>
      <Button onClick={handleDance}>Dance</Button>
      <Button onClick={handleStop} variant="danger">
        Stop
      </Button>
    </div>
  );
}

export default Controller;
