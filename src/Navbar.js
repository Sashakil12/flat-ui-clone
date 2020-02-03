import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import Slider, { Range } from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "hex", open: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleChange(e) {
    const { value } = e.target;
    this.setState({
      color: value,
      open: true
    });
    this.props.handleChange(e.target.value);
  }
  handleClose() {
    this.setState({
      open: false
    });
  }
  render() {
    return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">Better UI Colors</Link>
        </div>
        {this.props.slider && (
          <div className="slider-container">
            <span>Level {this.props.level}</span>
            <div className="slider">
              <Slider
                defaultValue={this.props.level}
                min={100}
                max={900}
                step={100}
                onAfterChange={this.props.changeLevel}
              />
            </div>
          </div>
        )}
        <div className="select-container">
          <Select
            name="color"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.color}
            onChange={this.handleChange}
          >
            <MenuItem value="hex">HEX - #ffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,0.5)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={
            <span id="message-id">
              Color Format Changed to {this.state.color.toUpperCase()}
            </span>
          }
          action={[
            <IconButton
              color="inherit"
              key="close"
              aria-label="close"
              onClick={this.handleClose}
            >
              <CancelIcon />
            </IconButton>
          ]}
        />
      </header>
    );
  }
}
export default Navbar;
