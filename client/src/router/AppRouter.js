import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import { Login } from "../components/Login"
import MovieApp from "../MovieApp";


const AppRouter = () => {
  return (
    <Router>
      <Switch>        
        <Route path="/" exact component={MovieApp} />
        <Route path="/auth" component={Login}>
        </Route>
      </Switch>
    </Router>
  )
};

export default AppRouter;