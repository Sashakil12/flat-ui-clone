import React from "react";
import ColorBox from "./ColorBox";
import uuid from "uuid/v4";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";

class SingleColorPalette extends React.Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    console.log(this._shades);
    this.state = { colorMode: "hex" };
    this.handleChange = this.handleChange.bind(this);
  }
  gatherShades(palette, colorToFilter) {
    //return all shades of given color
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilter)
      );
    }
    return shades;
  }
  handleChange(val) {
    this.setState({ colorMode: val }, () => console.log(this.state));
  }

  render() {
    const { colorMode } = this.state;
    const colorBoxes = this._shades.map(clr => (
      <ColorBox
        key={uuid()}
        showLink={false}
        name={clr.name}
        color={clr[colorMode]}
      />
    ));
    return (
      <div>
        <NavBar
          slider={false}
          handleChange={this.handleChange}
          level={this.state.level}
        />
        <div className="SingleColorPalette Palette">
          <h1>Single Color Palette</h1>
          <div className="Palette-colors">
            {colorBoxes}
            <div className="go-back ColorBox">
              <Link
                to={`/palette/${this.props.palette.id}`}
                className="back-button"
              >
                Go Back
              </Link>
            </div>
          </div>
        </div>
        <Footer
          paletteName={this.props.palette.paletteName}
          emoji={this.props.palette.emoji}
        />
      </div>
    );
  }
}

export default SingleColorPalette;
