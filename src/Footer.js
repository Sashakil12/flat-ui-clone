import React from "react";

function Footer(props) {
  return (
    <div>
      <footer className="palette-footer">
        {props.paletteName}
        <span className="emoji"> {props.emoji}</span>
      </footer>
    </div>
  );
}
export default Footer;
