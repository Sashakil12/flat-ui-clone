import React from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "rc-slider/assets/index.css";
import "./palette.css";

class Pallette extends React.Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
    this.changeLevel = this.changeLevel.bind(this);
  }
  changeLevel(level) {
    this.setState({ level });
  }
  render() {
    const ColorBoxes = this.props.palette.colors[
      this.state.level
    ].map(color => <ColorBox {...color} />);
    return (
      <div className="Palette">
        {/* Navbar goes here */}
        <Navbar changeLevel={this.changeLevel} level={this.state.level} />
        <div className="Palette-colors">{ColorBoxes}</div>
        {/* footer eventually */}
      </div>
    );
  }
}

export default Pallette;
