import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/styles";
const styles = {
  delBtn: {
    display: "flex",
    margin: "2px",
    marginLeft: "85%",
    opacity: 0,

    justifyContent: "flex-end",
    "&:active": {
      color: "white"
    },
    "&:hover": {
      color: "red"
    }
  }
};
export default withStyles(styles)(({ deletePalette, id, classes }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = id => {
    deletePalette(id);
    setOpen(false);
  };
  return (
    <React.Fragment>
      <IconButton
        className={classes.delBtn}
        variant="outlined"
        color="primary"
        onClick={e => {
          e.stopPropagation();
          handleClickOpen();
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Palette?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Palette ill be permanently deleted and this action can not be
            reverted!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={e => {
              e.stopPropagation();
              handleClose();
            }}
            color="primary"
          >
            Disagree
          </Button>
          <Button
            onClick={e => {
              e.stopPropagation();
              handleDelete(id);
            }}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});
