import React from "react";
import "./ColorBox.css";
class ColorBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ backgroundColor: this.props.color }} className="ColorBox">
        <div className="copy-container">
          <div className="box-content">
            <span>{this.props.name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <span className="see-more">More</span>
      </div>
    );
  }
}

export default ColorBox;
