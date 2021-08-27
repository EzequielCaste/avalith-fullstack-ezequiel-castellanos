import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import Login from "../components/Login"
import MovieApp from "../MovieApp";


const AppRouter = () => {
  return (
    <Router>
      <Switch>                
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={MovieApp} />
        <Route path="/auth" component={Login} />              
      </Switch>
    </Router>
  )
};

export default AppRouter;