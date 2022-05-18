import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { toast } from "react-toastify";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Moment from "moment";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createPool, upLoadFile } from "../../../service/pool";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: 120,
  },
}));

const CreatPool = ({ open, handleClose, handleGetListPool }) => {
  const classes = useStyles();
  const [ceo, setCeo] = useState({
    role: "CEO",
    name: "",
    img: "",
    link: "",
  });
  const [cto, setCto] = useState({
    role: "Head of Product",
    name: "",
    img: "",
    link: "",
  });
  const [cfo, setCfo] = useState({
    role: "CFO",
    name: "",
    img: "",
    link: "",
  });
  const [cm, setCm] = useState({
    role: "COMMUNITY MANAGER",
    name: "",
    img: "",
    link: "",
  });
  const [bfa, setBfa] = useState({
    role: "Blockchain and Financial Advisor",
    name: "",
    img: "",
    link: "",
  });

  const [poolList, setPoolList] = useState({
    projectName: "",
    tokenSymbol: "",
    supply: "",
    tokenAddress: "",
    saleDate: Moment(new Date()).format("YYYY-MMM-DD hh:mm"),
    amount: "",
    typeOfSale: "",
    forPrivateSale: "",
    swapRate: "",
    softCap: "",
    hardCap: "",
    pricepertoken: "",
    minAllocation: "",
    maxAllocation: "",
    projectLogo: "",
    projectTitle: "",
    projectSubtitle: "",
    projectImage: "",
    projectHighlights: "",
    productDescription: "",
    productImage: "",
    solution: "",
    businessModel: "",
    investors: "",
    tokenUtility: "",
    tokenomiceImage: "",
    raise: "",
    telegram: "",
    website: "",
    twitter: "",
    total: "",
    startTime: Moment(new Date()).format("YYYY-MMM-DD hh:mm"),
    endTime: Moment(new Date()).format("YYYY-MMM-DD hh:mm"),
    heroImg: "",
    market: "",
    linkWhiteList: "",
    tokenDistribution: "",
    initialMarketCap: "",
    initialTokenCirculation: "",
    teams: "",
    soldAmount: 0,
  });
  console.log(poolList.typeOfSale);
  const [error, setError] = useState({
    projectName: false,
    tokenSymbol: false,
    tokenAddress: false,
    typeOfSale: false,
    softCap: false,
    hardCap: false,
    telegram: false,
    website: false,
    twitter: false,
    pricepertoken: false,
    minAllocation: false,
    maxAllocation: false,
    projectLogo: false,
    projectTitle: false,
    projectSubtitle: false,
    projectImage: false,
    projectHighlights: false,
    productDescription: false,
    productImage: false,
    solution: false,
    businessModel: false,
    investors: false,
    team: false,
    tokenUtility: false,
    tokenomiceImage: false,
  });
  const [errorNumber, setErrorNumber] = useState({
    supply: false,
    pricepertoken: false,
    amount: false,
    forPrivateSale: false,
    swapRate: false,
    minAllocation: false,
    maxAllocation: false,
    raise: false,
    total: false,
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState("");

  const handleUploadFile = (e, type) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    upLoadFileImage(formData, type);
  };
  const handleUpFileTeam = (e, type) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    uploadFileTeam(formData, type);
  };
  const uploadFileTeam = async (file, type) => {
    try {
      const res = await upLoadFile(file);
      let ceoEdit = null;
      let ctoEdit = null;
      let cfoEdit = null;
      let cmEdit = null;
      let bfaEdit = null;
      switch (type) {
        case 'ceo':
          ceoEdit = {...ceo, img: res.data.data.filename};
          setCeo((prev) => (ceoEdit));
          break;
        case 'cto':
          ctoEdit = {...cto, img: res.data.data.filename};
          setCto((prev) => (ctoEdit));
          break;
        case 'cfo':
          cfoEdit = { ...cfo, img: res.data.data.filename };
          setCfo((prev) => (cfoEdit));
          break;
        case 'cm':
          cmEdit = {...cm, img: res.data.data.filename};
          setCm((prev) => (cmEdit));
          break;
        case 'bfa':
          bfaEdit = {...bfa, img: res.data.data.filename};
          setBfa((prev) => (bfaEdit));
          break;
      }

      const teams = [];
      teams.push(ceoEdit || ceo, ctoEdit || cto, cfoEdit || cfo, cmEdit || cm, bfaEdit || bfa);
      setPoolList({
        ...poolList,
        teams: JSON.stringify(teams),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const upLoadFileImage = async (file, type) => {
    try {
      const res = await upLoadFile(file);
      setPoolList((prev) => ({ ...prev, [type]: res.data.data.filename }));
    } catch (err) {
      console.log(err);
    }
  };
  const handleOnchange = (e) => {
    const value = e.target.value;
    if (value) {
      setError({ ...error, [e.target.name]: false });
    } else {
      setError({ ...error, [e.target.name]: true });
    }
    setPoolList({
      ...poolList,
      [e.target.name]: value,
    });
  };
  const handleOnchangeTeam = (e, type) => {
    const value = e.target.value;
    let ceoEdit = null;
    let ctoEdit = null;
    let cfoEdit = null;
    let cmEdit = null;
    let bfaEdit = null;
    switch (type) {
      case 'ceo':
        ceoEdit = {...ceo, [e.target.name]: value};
        setCeo((prev) => (ceoEdit));
        break;
      case 'cto':
        ctoEdit = {...cto, [e.target.name]: value};
        setCto((prev) => (ctoEdit));
        break;
      case 'cfo':
        cfoEdit = { ...cfo, [e.target.name]: value };
        setCfo((prev) => (cfoEdit));
        break;
      case 'cm':
        cmEdit = {...cm, [e.target.name]: value};
        setCm((prev) => (cmEdit));
        break;
      case 'bfa':
        bfaEdit = {...bfa, [e.target.name]: value};
        setBfa((prev) => (bfaEdit));
        break;
    }
    const teams = [];
    teams.push(ceoEdit || ceo, ctoEdit || cto, cfoEdit || cfo, cmEdit || cm, bfaEdit || bfa);
    setPoolList({
      ...poolList,
      teams: JSON.stringify(teams),
    });
  };

  const handleOnchangeNumber = (e) => {
    const value = e.target.value;
    if (typeof Number(value) === "number" && Number(value) > 0) {
      setErrorNumber({ ...errorNumber, [e.target.name]: false });
    } else {
      setErrorNumber({ ...errorNumber, [e.target.name]: true });
    }
    setPoolList({
      ...poolList,
      [e.target.name]: value,
    });
  };
  const handleSelectDate = (e, name) => {
    const date = Moment(e).format("MM/DD/YYYY");
    console.log(date);
    setPoolList({
      ...poolList,
      [name]: date,
    });
  };
  const apiCreatePool = async () => {
    try {
      const res = await createPool(poolList);
      if (res.data.data) {
        toast.success("The record has been created");
        handleClose();
        handleGetListPool();
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleCreate = () => {
    apiCreatePool();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle id="form-dialog-title">Add new</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  error={error.projectName}
                  helperText={error.projectName ? "The field is required" : ""}
                  value={poolList.projectName}
                  margin="dense"
                  variant="outlined"
                  id="ProjectName"
                  name="projectName"
                  label="Project Name	"
                  type="text"
                  fullWidth
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={error.tokenSymbol}
                  helperText={error.tokenSymbol ? "The field is required" : ""}
                  value={poolList.tokenSymbol}
                  margin="dense"
                  id="TOKENSymbol"
                  variant="outlined"
                  label="Token Symbol"
                  name="tokenSymbol"
                  type="text"
                  fullWidth
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={errorNumber.supply}
                  helperText={
                    errorNumber.supply
                      ? "The field is must be greater than 0"
                      : ""
                  }
                  value={poolList.supply}
                  margin="dense"
                  id="Supply"
                  variant="outlined"
                  label="Supply"
                  name="supply"
                  type="text"
                  fullWidth
                  onChange={handleOnchangeNumber}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={error.tokenAddress}
                  helperText={error.tokenAddress ? "The field is required" : ""}
                  value={poolList.tokenAddress}
                  margin="dense"
                  id="TokenAddress"
                  variant="outlined"
                  label="Token Address"
                  type="text"
                  name="tokenAddress"
                  fullWidth
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={errorNumber.amount}
                  helperText={
                    errorNumber.amount
                      ? "The field is must be greater than 0"
                      : ""
                  }
                  value={poolList.amount}
                  margin="dense"
                  id="Amount"
                  variant="outlined"
                  label="Amount"
                  name="amount"
                  type="text"
                  fullWidth
                  onChange={handleOnchangeNumber}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={errorNumber.pricepertoken}
                  helperText={
                    errorNumber.pricepertoken
                      ? "The field is must be greater than 0"
                      : ""
                  }
                  value={poolList.pricepertoken}
                  margin="dense"
                  id="pricepertoken"
                  variant="outlined"
                  label="Price Per Token"
                  name="pricepertoken"
                  type="text"
                  fullWidth
                  onChange={handleOnchangeNumber}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <MuiPickersUtilsProvider style utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="saleDate"
                    name="saleDate"
                    label="Sale Date"
                    format="MM/dd/yyyy"
                    value={poolList.saleDate}
                    inputVariant="outlined"
                    onChange={(e) => {
                      handleSelectDate(e, "saleDate");
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl variant="outlined" margin="dense" className={classes.formControl} fullWidth>
                  <InputLabel id="typeofSale">Type of Sale</InputLabel>
                  <Select
                    labelId="typeofSale"
                    id="typeofSale"
                    name="typeOfSale"
                    label="Type of Sale"
                    onChange={handleOnchange}
                  >
                    <MenuItem value={'private'}>Private</MenuItem>
                    <MenuItem value={'seed sale'}>Seed Sale</MenuItem>
                    <MenuItem value={'public'}>Public</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={errorNumber.forPrivateSale}
                  helperText={
                    errorNumber.forPrivateSale
                      ? "The field is must be greater than 0"
                      : ""
                  }
                  value={poolList.forPrivateSale}
                  margin="dense"
                  id="forPrivateSale"
                  variant="outlined"
                  label="For Private Sale"
                  name="forPrivateSale"
                  onChange={handleOnchangeNumber}
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={errorNumber.swapRate}
                  helperText={
                    errorNumber.swapRate
                      ? "The field is must be greater than 0"
                      : ""
                  }
                  value={poolList.swapRate}
                  margin="dense"
                  id="swapRate"
                  variant="outlined"
                  label="Swap Rate"
                  type="text"
                  name="swapRate"
                  fullWidth
                  onChange={handleOnchangeNumber}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={error.softCap}
                  helperText={error.softCap ? "The field is required" : ""}
                  value={poolList.softCap}
                  margin="dense"
                  id="softCap"
                  variant="outlined"
                  label="softCap"
                  type="text"
                  name="softCap"
                  fullWidth
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={error.hardCap}
                  helperText={error.hardCap ? "The field is required" : ""}
                  value={poolList.hardCap}
                  margin="dense"
                  id="hardCap"
                  variant="outlined"
                  name="hardCap"
                  label="Hard Cap"
                  type="text"
                  fullWidth
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={error.twitter}
                  helperText={error.twitter ? "The field is required" : ""}
                  value={poolList.twitter}
                  margin="dense"
                  id="twitter"
                  variant="outlined"
                  label="twitter"
                  type="text"
                  name="twitter"
                  fullWidth
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={error.website}
                  helperText={error.website ? "The field is required" : ""}
                  value={poolList.website}
                  margin="dense"
                  id="website"
                  variant="outlined"
                  label="Web"
                  type="text"
                  name="website"
                  fullWidth
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={error.telegram}
                  helperText={error.telegram ? "The field is required" : ""}
                  value={poolList.telegram}
                  name="telegram"
                  margin="dense"
                  id="telegram"
                  variant="outlined"
                  label="telegram"
                  type="text"
                  fullWidth
                  onChange={handleOnchange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  error={errorNumber.raise}
                  helperText={
                    errorNumber.raise
                      ? "The field is must be greater than 0"
                      : ""
                  }
                  value={poolList.raise}
                  margin="dense"
                  id="raise"
                  variant="outlined"
                  label="Raise"
                  type="text"
                  name="raise"
                  fullWidth
                  onChange={handleOnchangeNumber}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={errorNumber.total}
                  helperText={
                    errorNumber.raise
                      ? "The field is must be greater than 0"
                      : ""
                  }
                  value={poolList.total}
                  margin="dense"
                  id="total"
                  variant="outlined"
                  label="Total"
                  type="total"
                  name="total"
                  fullWidth
                  onChange={handleOnchangeNumber}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={errorNumber.minAllocation}
                  helperText={
                    errorNumber.minAllocation
                      ? "The field is must be greater than 0"
                      : ""
                  }
                  value={poolList.minAllocation}
                  margin="dense"
                  id="min"
                  variant="outlined"
                  label="Min Allocation"
                  name="minAllocation"
                  type="text"
                  fullWidth
                  onChange={handleOnchangeNumber}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  error={errorNumber.maxAllocation}
                  helperText={
                    errorNumber.maxAllocation
                      ? "The field is must be greater than 0"
                      : ""
                  }
                  value={poolList.maxAllocation}
                  margin="dense"
                  id="maxAllocation"
                  variant="outlined"
                  label="Max Allocation"
                  type="text"
                  name="maxAllocation"
                  fullWidth
                  onChange={handleOnchangeNumber}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <MuiPickersUtilsProvider style utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    full-width
                    margin="normal"
                    id="startTime"
                    name="startTime"
                    label="Start Time"
                    format="MM/dd/yyyy"
                    value={poolList.startTime}
                    inputVariant="outlined"
                    onChange={(e) => {
                      handleSelectDate(e, "startTime");
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} md={4}>
                <MuiPickersUtilsProvider style utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    full-width
                    margin="normal"
                    id="endTime"
                    name="endTime"
                    label="End Time"
                    format="MM/dd/yyyy"
                    value={poolList.endTime}
                    inputVariant="outlined"
                    onChange={(e) => {
                      handleSelectDate(e, "endTime");
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} md={4}>
                <h1 className="text-title">Project Logo</h1>
                <TextareaAutosize
                  aria-label="Project Logo"
                  minRows={2}
                  className="w-100"
                  placeholder="Project Logo"
                  error={error.projectLogo}
                  helperText={error.projectLogo ? "The field is required" : ""}
                  value={poolList.projectLogo}
                  name="projectLogo"
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <h1 className="text-title">Token Utility</h1>
                <TextareaAutosize
                  aria-label="Token Utility"
                  minRows={2}
                  className="w-100"
                  placeholder="Token Utility"
                  error={error.tokenUtility}
                  helperText={error.tokenUtility ? "The field is required" : ""}
                  value={poolList.tokenUtility}
                  name="tokenUtility"
                  onChange={handleOnchange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <h1 className="text-title">Project Subtitle</h1>
                <TextareaAutosize
                  aria-label="Project Logo"
                  minRows={2}
                  className="w-100"
                  placeholder="Project Subtitle"
                  error={error.projectSubtitle}
                  helperText={
                    error.projectSubtitle ? "The field is required" : ""
                  }
                  value={poolList.projectSubtitle}
                  name="projectSubtitle"
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <h1 className="text-title">Project Highlights</h1>
                <TextareaAutosize
                  aria-label="Project Logo"
                  minRows={2}
                  className="w-100"
                  placeholder="Project Highlights"
                  error={error.projectHighlights}
                  helperText={
                    error.projectHighlights ? "The field is required" : ""
                  }
                  value={poolList.projectHighlights}
                  name="projectHighlights"
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <h1 className="text-title">Project Image</h1>
                <TextareaAutosize
                  aria-label="Project Logo"
                  minRows={2}
                  className="w-100"
                  placeholder="Project Image"
                  error={error.projectImage}
                  helperText={error.projectImage ? "The field is required" : ""}
                  value={poolList.projectImage}
                  name="projectImage"
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <h1 className="text-title">Product Description</h1>
                <TextareaAutosize
                  aria-label="Project Logo"
                  minRows={2}
                  className="w-100"
                  placeholder="Product Description"
                  error={error.productDescription}
                  helperText={
                    error.productDescription ? "The field is required" : ""
                  }
                  value={poolList.productDescription}
                  name="productDescription"
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <h1 className="text-title">Solution</h1>
                <TextareaAutosize
                  aria-label="Project Logo"
                  minRows={2}
                  className="w-100"
                  placeholder="Solution"
                  error={error.solution}
                  helperText={error.solution ? "The field is required" : ""}
                  value={poolList.solution}
                  name="solution"
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <h1 className="text-title">Business Model</h1>
                <TextareaAutosize
                  aria-label="Project Logo"
                  minRows={2}
                  className="w-100"
                  placeholder="Business Model"
                  error={error.businessModel}
                  helperText={
                    error.businessModel ? "The field is required" : ""
                  }
                  value={poolList.businessModel}
                  name="businessModel"
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <h1 className="text-title">Investors</h1>
                <TextareaAutosize
                  aria-label="Project Logo"
                  minRows={2}
                  className="w-100"
                  placeholder="Investors"
                  error={error.investors}
                  helperText={error.investors ? "The field is required" : ""}
                  value={poolList.investors}
                  name="investors"
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <h1 className="text-title">Market</h1>
                <TextareaAutosize
                  aria-label="market"
                  minRows={2}
                  className="w-100"
                  placeholder="market"
                  value={poolList.market}
                  name="market"
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <h1 className="text-title">Link White List</h1>
                <TextField
                  value={poolList.linkWhiteList}
                  name="linkWhiteList"
                  margin="dense"
                  id="linkWhiteList"
                  variant="outlined"
                  placeholder="Link White List"
                  type="text"
                  fullWidth
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <h1 className="text-title">Token Distribution</h1>
                <TextField
                  value={poolList.tokenDistribution}
                  name="tokenDistribution"
                  margin="dense"
                  id="tokenDistribution"
                  variant="outlined"
                  placeholder="Token Distribution"
                  type="text"
                  fullWidth
                  onChange={handleOnchange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  value={poolList.initialMarketCap}
                  name="initialMarketCap"
                  margin="dense"
                  id="initialMarketCap"
                  variant="outlined"
                  label="Initial MarketCap"
                  type="text"
                  fullWidth
                  onChange={handleOnchange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  value={poolList.initialTokenCirculation}
                  name="initialTokenCirculation"
                  margin="dense"
                  id="initialTokenCirculation"
                  variant="outlined"
                  label="Initial Token Circulation"
                  type="text"
                  fullWidth
                  onChange={handleOnchange}
                />
              </Grid>
              <Grid item xs={12}>
                <h1 className="text-title">CEO</h1>
                <Grid container spacing={1} className="d-flex ">
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={ceo.name}
                      name="name"
                      margin="dense"
                      variant="outlined"
                      label="Name"
                      type="text"
                      fullWidth
                      onChange={(e) => handleOnchangeTeam(e, "ceo")}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={ceo.link}
                      name="link"
                      margin="dense"
                      variant="outlined"
                      label="LinkedIn"
                      type="text"
                      fullWidth
                      onChange={(e) => handleOnchangeTeam(e, "ceo")}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div
                      className="d-flex align-items-center"
                      style={{ height: "100%" }}
                    >
                      <span className="mr-2"> Image </span>
                      <input
                        type="file"
                        name="img"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => handleUpFileTeam(e, "ceo")}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <h1 className="text-title">Head of Product</h1>
                <Grid container spacing={1} className="d-flex ">
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={cto.name}
                      name="name"
                      margin="dense"
                      variant="outlined"
                      label="Name"
                      type="text"
                      fullWidth
                      onChange={(e) => handleOnchangeTeam(e, "cto")}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={cto.link}
                      name="link"
                      margin="dense"
                      variant="outlined"
                      label="LinkedIn"
                      type="text"
                      fullWidth
                      onChange={(e) => handleOnchangeTeam(e, "cto")}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div
                      className="d-flex align-items-center"
                      style={{ height: "100%" }}
                    >
                      <span className="mr-2"> Image </span>
                      <input
                        type="file"
                        name="img"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => handleUpFileTeam(e, "cto")}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <h1 className="text-title">CF0</h1>
                <Grid container spacing={1} className="d-flex ">
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={cfo.name}
                      name="name"
                      margin="dense"
                      variant="outlined"
                      label="Name"
                      type="text"
                      fullWidth
                      onChange={(e) => handleOnchangeTeam(e, "cfo")}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={cfo.link}
                      name="link"
                      margin="dense"
                      variant="outlined"
                      label="LinkedIn"
                      type="text"
                      fullWidth
                      onChange={(e) => handleOnchangeTeam(e, "cfo")}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div
                      className="d-flex align-items-center"
                      style={{ height: "100%" }}
                    >
                      <span className="mr-2"> Image </span>
                      <input
                        type="file"
                        name="img"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => handleUpFileTeam(e, "cfo")}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <h1 className="text-title">COMMUNITY MANAGER</h1>
                <Grid container spacing={1} className="d-flex ">
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={cm.name}
                      name="name"
                      margin="dense"
                      variant="outlined"
                      label="Name"
                      type="text"
                      fullWidth
                      onChange={(e) => handleOnchangeTeam(e, "cm")}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={cm.link}
                      name="link"
                      margin="dense"
                      variant="outlined"
                      label="LinkedIn"
                      type="text"
                      fullWidth
                      onChange={(e) => handleOnchangeTeam(e, "cm")}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div
                      className="d-flex align-items-center"
                      style={{ height: "100%" }}
                    >
                      <span className="mr-2"> Image </span>
                      <input
                        type="file"
                        name="img"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => handleUpFileTeam(e, "cm")}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <h1 className="text-title">Blockchain and Financial Advisor</h1>
                <Grid container spacing={1} className="d-flex ">
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={bfa.name}
                      name="name"
                      margin="dense"
                      variant="outlined"
                      label="Name"
                      type="text"
                      fullWidth
                      onChange={(e) => handleOnchangeTeam(e, "bfa")}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={bfa.link}
                      name="link"
                      margin="dense"
                      variant="outlined"
                      label="LinkedIn"
                      type="text"
                      fullWidth
                      onChange={(e) => handleOnchangeTeam(e, "bfa")}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div
                      className="d-flex align-items-center"
                      style={{ height: "100%" }}
                    >
                      <span className="mr-2"> Image </span>
                      <input
                        type="file"
                        name="img"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => handleUpFileTeam(e, "bfa")}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "100%" }}
                >
                  <span className="mr-2">Product Image </span>
                  <input
                    type="file"
                    name="productImage"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleUploadFile(e, "productImage")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "100%" }}
                >
                  <span className="mr-2">Hero Image </span>
                  <input
                    type="file"
                    name="heroImg"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleUploadFile(e, "heroImg")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "100%" }}
                >
                  <span className="mr-2"> Logo </span>
                  <input
                    type="file"
                    name="logo"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleUploadFile(e, "logo")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "100%" }}
                >
                  <span className="mr-2"> Telegram </span>
                  <input
                    type="file"
                    name="telegram"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleUploadFile(e, "telegramIcon")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "100%" }}
                >
                  <span className="mr-2"> Web </span>
                  <input
                    type="file"
                    name="website"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleUploadFile(e, "websiteIcon")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "100%" }}
                >
                  <span className="mr-2"> Twitter </span>
                  <input
                    type="file"
                    name="twitter"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleUploadFile(e, "twitterIcon")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "100%" }}
                >
                  <span className="mr-2"> Tokenomice Image </span>
                  <input
                    type="file"
                    name="tokenomiceImage"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleUploadFile(e, "tokenomiceImage")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "100%" }}
                >
                  <span className="mr-2"> Solution Image </span>
                  <input
                    type="file"
                    name="solutionImage"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleUploadFile(e, "solutionImage")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "100%" }}
                >
                  <span className="mr-2"> Business ModelImage </span>
                  <input
                    type="file"
                    name="businessModelImage"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleUploadFile(e, "businessModelImage")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "100%" }}
                >
                  <span className="mr-2">Investors Image </span>
                  <input
                    type="file"
                    name="investorsImage"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleUploadFile(e, "investorsImage")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "100%" }}
                >
                  <span className="mr-2">Token UtilityImages </span>
                  <input
                    type="file"
                    name="tokenUtilityImages"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleUploadFile(e, "tokenUtilityImages")}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="d-flex px-4">
            <Button onClick={handleClose} color="primary">
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
export default CreatPool;
