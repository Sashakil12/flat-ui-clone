import React from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
    const { hex, name } = this.props;

    return (
      <CopyToClipboard text={hex} onCopy={this.handleCopy}>
        <div style={{ backgroundColor: hex }} className="ColorBox">
          <div
            style={{ backgroundColor: hex }}
            className={`copy-overlay ${this.state.copied && "show"}`}
          ></div>
          <div className={`copy-msg ${this.state.copied && "show"}`}>
            <h1>copied!</h1>
            <p>{hex}</p>
          </div>
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
