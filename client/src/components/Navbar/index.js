import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/appContext'

const Navbar = () => {
  const {state, actions} = useContext(AppContext);
  
  const {isLoggedIn, admin} = state;
 

  return (
    <div className="Navbar">
      <div>Movie Rental</div>
      {
        isLoggedIn ? 
          (
            <div>
              <button onClick={actions.handleLogout} >Logout</button>
              <Link to="/favorites">View Favorites</Link>
              <Link to="/add-movie">Add Movie</Link>
            </div>
          )  
          :   <Link to="/auth">Login</Link>      
      } 
     


      {/* {
        isLoggedIn 
          ? ( 
            <div>
              <button onClick={actions.handleLogout} >Logout</button>
              <Link to="/favorites">View Favorites</Link>
              (admin && <Link to="/add-movie">Add Movie</Link>)
            </div>
          )
          : <Link to="/auth">Login</Link>
      } */}
      
    </div>
  )
}

export default Navbar
