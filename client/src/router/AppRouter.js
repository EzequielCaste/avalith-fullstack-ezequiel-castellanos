import React, { useContext, useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import EditMovie from '../components/EditMovie';
import Favorites from '../components/Favorites';
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
        <Route path="/favorites" component={Favorites} />   
        <Route path="/edit-movie/:id" component={EditMovie} />
      </Switch>
    </Router>
  )
};

export default AppRouter;