import React from "react";
import Pallette from "./Pallette";
import SeedColors from "./seedColors";
import generatePalette from "./colorHelper";

function App() {
  return (
    <div>
      <Pallette palette={generatePalette(SeedColors[5])} />
    </div>
  );
}

export default App;
