import React from "react";
import "./ColorBox.css";
class ColorBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ backgroundColor: this.props.color }} className="ColorBox">
        <span>{this.props.name}</span>
        <span>More</span>
      </div>
    );
  }
}

export default ColorBox;
