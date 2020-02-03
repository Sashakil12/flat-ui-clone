import React, { Fragment } from "react";
import Pallette from "./Pallette";
import SeedColors from "./seedColors";
import PaletteList from "./PaletteList";
import generatePalette from "./colorHelper";
import { Route, Switch } from "react-router-dom";

function App() {
  function findPalette(id) {
    return SeedColors.find(pal => pal.id === id);
  }
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <PaletteList palettes={SeedColors} />}
      />

      <Route
        exact
        path="/palette/:id"
        render={routeProps => (
          <Pallette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
    </Switch>
  );
}

export default App;

/* <div>
        <Pallette palette={generatePalette(SeedColors[5])} />
      </div> */
