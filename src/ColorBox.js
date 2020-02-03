import React from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";

class ColorBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.handleCopy = this.handleCopy.bind(this);
  }
  handleCopy() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  }
  render() {
    const { color, name, colorId, paletteId, showLink } = this.props;
    const isDarkColor = chroma(color).luminance() <= 0.8;
    
    console.log(chroma(color).luminance() <= 0.8);

    return (
      <CopyToClipboard text={color} onCopy={this.handleCopy}>
        <div style={{ backgroundColor: color }} className="ColorBox">
          <div
            style={{ backgroundColor: color }}
            className={`copy-overlay ${this.state.copied && "show"}`}
          ></div>
          <div className={`copy-msg ${this.state.copied && "show"}`}>
            <h1 className={isDarkColor ? "lightText" : "darkText"}>copied!</h1>
            <p className={isDarkColor ? "lightText" : "darkText"}>{color}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor ? "lightText" : "darkText"}>
                {name}
              </span>
            </div>
            <button
              className={`copy-button ${
                isDarkColor ? "lightText" : "darkText"
              }`}
            >
              Copy
            </button>
          </div>

          {showLink ? (
            <Link
              to={`/palette/${paletteId}/${colorId}`}
              onClick={e => e.stopPropagation()}
            >
              <span
                className={`see-more ${isDarkColor ? "lightText" : "darkText"}`}
              >
                More
              </span>
            </Link>
          ) : null}
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
