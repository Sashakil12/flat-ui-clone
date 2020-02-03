import React, { Fragment } from "react";
import Pallette from "./Pallette";
import SeedColors from "./seedColors";
import generatePalette from "./colorHelper";
import { Route, Switch } from "react-router-dom";

function App() {
  function findPalette(id) {
    return SeedColors.find(pal => pal.id === id);
  }
  return (
    <Switch>
      <Route exact path="/" render={() => <h1>Palette list Goes here</h1>} />

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
