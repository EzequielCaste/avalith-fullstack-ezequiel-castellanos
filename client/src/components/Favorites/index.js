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
    console.log(e.target.id);
    actions.removeFavorite(e.target.id);
    actions.getFavorites();
  }

  if (isLoggedIn) {
    return (
      <div>
        <h1>Favorite Movies</h1>
        {
          favorites && 
          favorites.map( movie => (
            <div key={movie.title} className="movie-card">
              <div >
                {movie.title}
              </div>
              <button id={movie.id} onClick={handleClick}>X</button>
            </div>
          ))
        }
        <Link to="/home">Back</Link>
      </div>
    )  
  } else {
    return null;
  }
  
}

export default Favorites
