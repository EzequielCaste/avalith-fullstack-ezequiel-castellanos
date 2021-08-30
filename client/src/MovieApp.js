import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppContext } from "./context/appContext";

function MovieApp() {
  const {state, actions} = useContext(AppContext);
  const {movies, isLoading, isLoggedIn, admin} = state;

  useEffect(() => {
    actions.getMovies();    
  }, []); 
  
  const handleClick = (e) => {   
    actions.addToFavorites(e.target.id, state.token);    
  }
  return (
    <>
      <Navbar />
      <div>      
        {
          isLoading 
            ? <h1>Loading...</h1>
            : (
              movies && movies.map( movie => (
                <p key={movie.title}>
                  {movie.title}
                  {
                    isLoggedIn && <button id={movie.id} onClick={handleClick}>Add to Favorites</button>
                  }
                  {
                    isLoggedIn && admin && <Link to={`/edit-movie/${movie.id}`}>Edit Movie</Link>
                  }
                </p>
              ))
            )
        }      
      </div>
      {
        state.errorMsg &&         
          <div>
            Error:
            { <p>{state.errorMsg}</p> }
          </div>             
      }
    </>
  );
}

export default MovieApp;
