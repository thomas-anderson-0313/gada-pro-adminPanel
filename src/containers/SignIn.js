import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IntlMessages from "util/IntlMessages"
import CircularProgress from "@material-ui/core/CircularProgress"
import { NotificationContainer, NotificationManager } from "react-notifications"
import { loginService } from "../service/login"

const SignIn = (props) => {
  console.log(props)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (token !== null) {
      props.history.push("app/pool")
    }
  }, [token])
  const handleLogin = async () => {
    try {
      const res = await loginService(email, password)
      console.log(res)
      localStorage.setItem("token", res.data.data.accessToken)
      localStorage.setItem("userName", res.data.data.accountID)
      // props.history.push("app/pool")
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
      setMessage("Please try again !")
      setTimeout(() => {
        setMessage("")
      }, 100)
    }
  }
  return (
    <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="app-login-main-content">
        <div className="app-login-content">
          <div className="app-login-header mb-4">
            <h1>
              <IntlMessages id="appModule.email" />
            </h1>
          </div>

          <div className="app-login-form">
            <form>
              <fieldset>
                <TextField
                  label={<IntlMessages id="appModule.email" />}
                  fullWidth
                  onChange={(event) => setEmail(event.target.value)}
                  defaultValue={email}
                  margin="normal"
                  className="mt-1 my-sm-3"
                />
                <TextField
                  type="password"
                  label={<IntlMessages id="appModule.password" />}
                  fullWidth
                  onChange={(event) => setPassword(event.target.value)}
                  defaultValue={password}
                  margin="normal"
                  className="mt-1 my-sm-3"
                />

                <div className="mb-3 d-flex align-items-center justify-content-between">
                  <Button
                    onClick={() => {
                      setLoading(true)
                      setMessage("")
                      handleLogin()
                    }}
                    variant="contained"
                    color="primary"
                  >
                    <IntlMessages id="appModule.signIn" />
                  </Button>

                  <Link to="/signup">
                    <IntlMessages id="signIn.signUp" />
                  </Link>
                </div>
              </fieldset>
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

export default withRouter(SignIn)
