import React from "react";
import Pallette from "./Pallette";
import SeedColors from "./seedColors";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorComponent";
import generatePalette from "./colorHelper";
import { Route, Switch } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { palettes: [] };
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    
    this.deletePalette = this.deletePalette.bind(this);

  }
  componentDidMount() {
    const palettes =
      JSON.parse(window.localStorage.getItem("fuic-palette")) || SeedColors;
    console.log(palettes);
    this.setState({
      palettes: [...palettes]
    });
  }
  findPalette(id) {
    return this.state.palettes.find(pal => {
      return pal.id === id;
    });
  }
  savePalette(palette) {
    this.setState(
      st => ({
        palettes: [...st.palettes, palette]
      }),
      () =>
        window.localStorage.setItem(
          "fuic-palette",
          JSON.stringify(this.state.palettes)
        )
    );
  }
  deletePalette(id) {
    this.setState(
      st => ({
        palettes: [...st.palettes.filter(pal=> pal.id !== id)]
      }),
      () =>
        window.localStorage.setItem(
          "fuic-palette",
          JSON.stringify(this.state.palettes)
        )
    );
  }
  render() {
    return (
      <Switch>
        <Route
          new
          path="/palette/new"
          render={routeProps => (
            <NewPaletteForm
              palette={this.state.palettes[0]}
              savePalette={this.savePalette}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => <PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} />}
        />

        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Pallette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;

/* <div>
        <Pallette palette={generatePalette(SeedColors[5])} />
      </div> */
