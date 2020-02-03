import React from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "rc-slider/assets/index.css";
import "./palette.css";

class Pallette extends React.Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, colorMode: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  changeLevel(level) {
    this.setState({ level });
  }
  handleChange(val) {
    this.setState({ colorMode: val }, () => console.log(this.state));
  }
  render() {
    const ColorBoxes = this.props.palette.colors[
      this.state.level
    ].map(color => (
      <ColorBox
        showLink
        key={color.id}
        colorId={color.id}
        color={color[this.state.colorMode]}
        name={color.name}
        paletteId={this.props.palette.id}
      />
    ));
    return (
      <div className="Palette">
        <Navbar
          slider
          changeLevel={this.changeLevel}
          handleChange={this.handleChange}
          level={this.state.level}
        />
        <div className="Palette-colors">{ColorBoxes}</div>
        <Footer
          paletteName={this.props.palette.paletteName}
          emoji={this.props.palette.emoji}
        />
      </div>
    );
  }
}

export default Pallette;
