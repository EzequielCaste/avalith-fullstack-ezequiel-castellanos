import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/appContext'

const Navbar = () => {
  const {state, actions} = useContext(AppContext);
  
  const {isLoggedIn} = state;

  return (
    <div className="Navbar">
      <div>Movie Rental</div>
      {
        isLoggedIn 
          ? <button onClick={actions.handleLogout} >Logout</button> 
          : <Link to="/auth">Login</Link>
      }
      
    </div>
  )
}

export default Navbar
