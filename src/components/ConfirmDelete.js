import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

const ConfirmDelete = ({ open, handleClose, name, handleDelete }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle id="form-dialog-title">Are you sure</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <span
              style={{
                fontWeight: 600,
                fontSize: 24,
                color: "#000",
                marginRight: 4,
              }}
            >
              {name}
            </span>{" "}
            will be permanentely deleted and removed from existing menus.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmDelete
