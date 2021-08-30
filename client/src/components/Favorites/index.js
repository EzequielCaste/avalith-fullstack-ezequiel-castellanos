import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/appContext'

const Favorites = () => {
  const {state, actions} = useContext(AppContext);
  const {favorites, isLoggedIn} = state;

  // fetch favorites of user that is logged in
  useEffect( () => {
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
    return <Redirect to="/auth" />
  }
  
}

export default Favorites
