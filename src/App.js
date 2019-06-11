//react imports
import React from "react";
import RetroBoard from "./containers/Board";
import { Typography as Text } from "@material-ui/core";

function App() {
  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#EEE", color: "#AAA", padding:'0 25px' }}><Text variant="overline">Retronator</Text></div>
      <RetroBoard />
    </React.Fragment>
  );
}

export default App;
