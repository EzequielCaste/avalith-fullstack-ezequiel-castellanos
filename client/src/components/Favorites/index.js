import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import './index.css';

const Favorites = () => {
  const {state, actions} = useContext(AppContext);

  const {favorites, isLoggedIn} = state;

  useEffect( () => {    
    const token = window.localStorage.getItem('token');

    if (token) {      
      actions.handleToken(token);     
    } 

    actions.getFavorites();
  }, []);

  const handleClick = (e) => {   
    actions.removeFavorite(e.target.id);
    actions.getFavorites();
  }

  if (isLoggedIn) {
    return (
      <div className="Favorites">
        <h2 className="title">Favorite Movies</h2>
        {
          favorites && 
          favorites.map( movie => (
            <div key={movie.title} className="movie-card">
              <div>
                {movie.title}
              </div>
              <img src={movie.image} alt={movie.title} />
              <button id={movie.id} onClick={handleClick}>Remove</button>
            </div>
          ))
        }
        <Link to="/home">Back</Link>
      </div>
    )  
  } else {
    return (
      <div>
        <h2>Not logged in</h2>
        <Link to="/auth">Login</Link>
      </div>
    )
  }
  
}

export default Favorites
