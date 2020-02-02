import React from "react";

class Pallette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="Palette">
        {/* Navbar goes here */}
        <div className="Palette-colors"></div>
        {/* footer eventually */}
      </div>
    );
  }
}

export default Pallette;
