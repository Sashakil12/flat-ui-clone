import React from "react";
import Pallette from "./Pallette";
import SeedColors from "./seedColors";
function App() {
  return (
    <div>
      <Pallette {...SeedColors[5]} />
    </div>
  );
}

export default App;
