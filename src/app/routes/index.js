import React from "react"
import { Route, Switch, withRouter } from "react-router-dom"
import asyncComponent from "../../util/asyncComponent"

const Routes = ({ match }) => (
  <Switch>
    <Route
      path={`${match.url}/pool`}
      component={asyncComponent(() => import("./Pool"))}
    />
    {/*<Route component={asyncComponent(() => import("app/routes/extraPages/routes/404"))}/>*/}
  </Switch>
)

export default withRouter(Routes)
