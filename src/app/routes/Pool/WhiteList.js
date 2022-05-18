import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import { Card, CardContent, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import { editPool } from "service/pool";
import { green } from "@material-ui/core/colors";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const WhiteList = ({ open, handleClose, handleGetListPool, item }) => {
  const classes = useStyles();

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [whiteList, setWhiteList] = useState([]);
  const [newToken, setNewToken] = useState('');

  useEffect(() => {
    if (item && item.whiteList && item.whiteList[0]) {
      setWhiteList([...item.whiteList]);
    }
  }, [item]);

  const apiCreatePool = async () => {
    try {
      const res = await editPool({
        ...item,
        id: item._id,
        whiteList,
      });
      if (res.data.data) {
        _handleClose();
        toast.success("The white list has been updated");
        handleGetListPool();
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };
  const handleCreate = () => {
    apiCreatePool();
  };

  const _handleClose = () => {
    setWhiteList([]);
    setNewToken('');
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={_handleClose} maxWidth="md" fullWidth>
        <DialogTitle id="form-dialog-title">White List</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table
                  className={classes.table}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={classes.headText}>
                        Address
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      ></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {whiteList.map((row, index) => (
                      <StyledTableRow key={row}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className={classes.headText}
                        >
                          <Grid item xs={12} md={12}>
                            <TextField
                              value={row}
                              margin="dense"
                              variant="outlined"
                              type="text"
                              name="token"
                              disabled
                              fullWidth
                              onChange={(e) => {
                                const temWhiteList = [...whiteList];
                                temWhiteList[index] = e.target.value;
                                setWhiteList(temWhiteList);
                              }}
                            />
                          </Grid>
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.headText}
                        >
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              const temWhiteList = [...whiteList];
                              temWhiteList.splice(index, 1);
                              setWhiteList(temWhiteList);
                            }}
                          >
                            <DeleteIcon style={{ color: "red" }} />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                      ))}
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.headText}
                      >
                        <Grid item xs={12} md={12}>
                          <TextField
                            value={newToken}
                            margin="dense"
                            variant="outlined"
                            type="text"
                            name="token"
                            fullWidth
                            onChange={(e) => setNewToken(e.target.value)}
                          />
                        </Grid>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            setWhiteList([...whiteList, newToken]);
                            setNewToken('');
                          }}
                        >
                          <AddIcon style={{ color: "green" }} />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="d-flex px-4">
            <Button onClick={_handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreate}
              className="mx-2"
            >
              SAVE
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      {message && NotificationManager.error(message)}
      {success && NotificationManager.success(success)}
      <NotificationContainer />
    </div>
  );
};
export default WhiteList;
