import React from "react";
import ColorBox from "./ColorBox";
import "./palette.css";

class Pallette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const ColorBoxes = this.props.colors.map(color => <ColorBox {...color} />);
    return (
      <div className="Palette">
        {/* Navbar goes here */}

        <div className="Palette-colors">{ColorBoxes}</div>
        {/* footer eventually */}
      </div>
    );
  }
}

export default Pallette;
