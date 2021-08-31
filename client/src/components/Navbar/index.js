import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import './index.css';

const Navbar = () => {
  const {state, actions} = useContext(AppContext);
  
  const {isLoggedIn} = state; 

  return (
    <div className="Navbar">
      <h2>Movie Rental</h2>
      {
        isLoggedIn ? 
          (
            <div className="navbar-container">              
              <Link to="/favorites">View Favorites</Link>
              <Link to="/add-movie">Add Movie</Link>
              <button onClick={actions.handleLogout} >Logout</button>
            </div>
          )  
          :   <Link to="/auth">Login</Link>      
      }       
    </div>
  )
}

export default Navbar
