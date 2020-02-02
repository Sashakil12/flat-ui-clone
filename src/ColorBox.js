import React from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
class ColorBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { color, name } = this.props;
    return (
      <CopyToClipboard text={color}>
        <div style={{ backgroundColor: color }} className="ColorBox">
          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          <span className="see-more">More</span>
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
