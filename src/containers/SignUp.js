import React, { useEffect, useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import IntlMessages from "util/IntlMessages"
import { hideMessage } from "../actions"
import CircularProgress from "@material-ui/core/CircularProgress"
import { NotificationContainer, NotificationManager } from "react-notifications"
import axios from "axios"

const SignUp = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  // function
  const handleRegister = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/register`,
        {
          accountID: email,
          password: password,
        }
      )
      localStorage.setItem("token", res.data.data.accessToken)
      setLoading(false)
      props.history.push("app/pool")
    } catch (err) {
      console.log(err)
      setLoading(false)
      setMessage("Please try again !")
    }
  }
  return (
    <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="app-login-main-content">
        <div className="app-login-content">
          <div className="app-login-header">
            <h1>Sign Up</h1>
          </div>

          <div className="mb-4">
            <h2>
              <IntlMessages id="appModule.createAccount" />
            </h2>
          </div>

          <div className="app-login-form">
            <form method="post" action="/">
              <TextField
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                label={<IntlMessages id="appModule.email" />}
                fullWidth
                defaultValue={email}
                margin="normal"
                className="mt-0 mb-2"
              />

              <TextField
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                label={<IntlMessages id="appModule.password" />}
                fullWidth
                defaultValue={password}
                margin="normal"
                className="mt-0 mb-4"
              />

              <div className="mb-3 d-flex align-items-center justify-content-between">
                <Button
                  variant="contained"
                  onClick={() => {
                    setLoading(true)
                    setMessage("")
                    handleRegister()
                  }}
                  color="primary"
                >
                  <IntlMessages id="appModule.regsiter" />
                </Button>
                <Link to="/signin">
                  <IntlMessages id="signUp.alreadyMember" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loader-view">
          <CircularProgress />
        </div>
      )}
      {message && NotificationManager.error(message)}
      <NotificationContainer />
    </div>
  )
}

export default SignUp
