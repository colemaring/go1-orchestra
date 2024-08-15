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

  const handleDance3 = () => {
    console.log("Dance 3 button clicked");
    ws.send(JSON.stringify({ type: "dance3" }));
  };

  return (
    <div className="controller">
      <Button onClick={handleDance1}>Dance 1</Button>
      <Button onClick={handleDance2}>Dance 2</Button>
      <Button onClick={handleDance3}>Dance 3</Button>
    </div>
  );
}

export default Controller;
