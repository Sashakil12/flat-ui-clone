import React from "react";
import { withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.8px"
  },
  delIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    color: "white"
  },
  name: {
    position: "absolute",
    bottom: 0,
    left: 0,
    color: "white",
    marginLeft: "1rem"
  }
};
function DragColorComp({ color, classes, name, handleDelete }) {
  return (
    <div style={{ backgroundColor: color }} className={classes.root}>
      <p className={classes.name}>{name}</p>
      <IconButton
        className={classes.delIcon}
        onClick={() => handleDelete(color)}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
export default withStyles(styles)(DragColorComp);
