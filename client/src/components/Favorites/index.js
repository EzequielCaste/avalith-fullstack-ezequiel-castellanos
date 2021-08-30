import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/appContext'

const Favorites = () => {
  const {state, actions} = useContext(AppContext);

  const {favorites, isLoggedIn} = state;

  useEffect( () => {    
    const token = window.localStorage.getItem('token');

    if (token) {
      console.log('yes token');
      actions.handleToken(token);     
    } else {
      console.log('no token');
    }

    actions.getFavorites();
  }, [])

  if (isLoggedIn) {
    return (
      <div>
        <h1>Favorite Movies</h1>
        {
          favorites && 
          favorites.map( movie => (
            <div key={movie.title}>
              {movie.title}
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
