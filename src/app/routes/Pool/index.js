import React, { useState, useEffect } from "react"
import { styled } from "@material-ui/core/styles"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import Moment from "moment"
import IconButton from "@material-ui/core/IconButton"
import CreatePool from "./CreatPool"
import EditPool from "./EditPool"
import { listPool, deletePool } from "../../../service/pool"
import ConfirmDelete from "../../../components/ConfirmDelete"
import { NotificationContainer, NotificationManager } from "react-notifications"
import WhiteList from "./WhiteList"
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
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  table: {
    minWidth: 700,
  },
  headText: {
    whiteSpace: "nowrap",
    textAlign: "center",
  },
})
const Pool = (props) => {
  const classes = useStyles()
  const [limit, setLimit] = useState(100)
  const [page, setPage] = useState(0)
  const [pool, setPool] = useState("")
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openWhiteList, setOpenWhiteList] = useState(false)
  const [openDel, setOpenDel] = useState(false)
  const [poolItem, setPoolItem] = useState("")
  const [nameDel, setNameDel] = useState("")
  const [deleteId, setDeleteId] = useState("")
  const [success, setSuccess] = useState("")
  const handleGetListPool = async () => {
    try {
      const res = await listPool(0, 1000)
      setPool(res.data.data.pools)
    } catch (err) {
      console.log(err)
    }
  }
  const handleDeletePool = async () => {
    try {
      const res = await deletePool(deleteId)
      if (res.data.status) {
        handleGetListPool()
        setOpenDel(false)
      }
    } catch (err) {
      console.log(err)
      localStorage.removeItem('token')
      props.history.push("/")
    }
  }
 
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setPoolItem('');
    setOpen(false)
  }
  const handleCloseEdit = () => {
    setPoolItem('');
    setOpenEdit(false)
  }
  const handleCloseWhiteList = () => {
    setPoolItem('');
    setOpenWhiteList(false)
  }
  const handleCloseDel = () => {
    setOpenDel(false)
  }
  const handleEdit = (item) => {
    setPoolItem(item)
    setTimeout(() => {
      setOpenEdit(true)
    }, 200)
  }
  const handleWhiteList = (item) => {
    setPoolItem(item)
    setTimeout(() => {
      setOpenWhiteList(true)
    }, 200)
  }
  const handleDelete = (name) => {
    setNameDel(name)
    setOpenDel(true)
  }

  useEffect(() => {
    handleGetListPool()
  }, [])
  return (
    <div className="p-4">
      <CreatePool
        open={open}
        handleClose={handleClose}
        handleGetListPool={handleGetListPool}
      />
      <EditPool
        open={openEdit}
        handleClose={handleCloseEdit}
        handleGetListPool={handleGetListPool}
        item={poolItem}
      />
      <WhiteList
        open={openWhiteList}
        handleClose={handleCloseWhiteList}
        handleGetListPool={handleGetListPool}
        item={poolItem}
      />
      <ConfirmDelete
        open={openDel}
        handleClose={handleCloseDel}
        name={nameDel}
        handleDelete={handleDeletePool}
      />
      <Card>
        <CardContent>
          <div className="d-flex justify-content-end">
            <Button
              variant="contained"
              color="primary"
              className="mb-2"
              onClick={handleClickOpen}
            >
              Create
            </Button>
          </div>
          <TableContainer>
            <Table
              className={classes.table}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell className={classes.headText}>
                    Project Name
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    TOKEN Symbol
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    Supply
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    Token Address
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    Amount
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    Sale date
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    Type of sale{" "}
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    For private sale
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    Swap rate
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    Sort cap
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    Hard cap
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    Min
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    Max
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    Start time
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    End time
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.headText}>
                    White List
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    className={classes.headText}
                  ></StyledTableCell>
                  <StyledTableCell
                    align="right"
                    className={classes.headText}
                  ></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pool[0] &&
                  pool.map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.headText}
                      >
                        {row.projectName}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {row.tokenSymbol}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {row.supply}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {row.tokenAddress}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {row.amount}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {Moment(row.saleDate).format("DD MMM YYYY")}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {row.typeOfSale}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {row.forPrivateSale}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {row.swapRate}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {row.softCap}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {row.hardCap}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {row.minAllocation}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {row.maxAllocation}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {Moment(row.startTime).format("DD MMM YYYY")}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        {Moment(row.endTime).format("DD MMM YYYY")}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                        onClick={() => handleWhiteList(row)}
                        style={{ color: "green", cursor: 'pointer' }}
                      >
                        Show
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            handleDelete(row.projectName)
                            setDeleteId(row._id)
                          }}
                        >
                          <DeleteIcon style={{ color: "red" }} />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.headText}
                      >
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEdit(row)}
                        >
                          <EditIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      {success && NotificationManager.success(success)}
      <NotificationContainer />
    </div>
  )
}

export default Pool
