import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/styles/";
import { Link } from "react-router-dom";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function SavePalette({
  handleSave,
  setPaletteName,
  setPaletteEmoji,
  paletteName,
  classes
}) {
  const [open, setOpen] = React.useState("none");
  // const [palName, setName] = React.useState("");
  // const [emojiName, setEmoji] = React.useState("");
  const handleClickOpen = () => {
    setOpen("form");
  };
  const handleClose = val => {
    setOpen(val);
  };
  const doSave = () => {
    setOpen("none");
    handleSave();
  };
  return (
    <div className={classes.btn}>
      <Link to="/">
        <Button variant="contained" color="secondary">
          Go Back
        </Button>
      </Link>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Save Palette
      </Button>
      <Dialog
        open={open === "picker"}
        onClose={() => handleClose("form")}
        aria-labelledby="form-dialog-title"
      >
        <Picker
          title="Pick an emoji that represent your palette"
          onSelect={setPaletteEmoji}
        />
        <DialogActions>
          <Button onClick={() => handleClose("none")} color="primary">
            Cancel
          </Button>
          <Button onClick={doSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open === "form"}
        onClose={() => handleClose("picker")}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Palette Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To save your palette please enter a name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Palette Name"
            type="text"
            onChange={e => setPaletteName(e.target.value)}
            value={paletteName}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("none")} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose("picker")} color="primary">
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const styles = {
  btn: {
    "& a": {
      textDecoration: "none"
    }
  }
};
export default withStyles(styles)(SavePalette);
