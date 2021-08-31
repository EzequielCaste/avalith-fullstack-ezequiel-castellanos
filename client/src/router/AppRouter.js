import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import AddMovie from '../components/AddMovie';
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
        <Route path="/home" exact component={MovieApp} />
        <Route path="/auth" exact component={Login} />           
        <Route path="/favorites" exact component={Favorites} />   
        <Route path="/edit-movie/:id" component={EditMovie} />
        <Route path="/add-movie" exact component={AddMovie} />
        <Redirect to="/home" />
      </Switch>
    </Router>
  )
};

export default AppRouter;