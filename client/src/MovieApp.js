import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppContext } from "./context/appContext";

function MovieApp() {
  const {state, actions} = useContext(AppContext);
  
  const {movies, isLoading, isLoggedIn, admin, errorMsg} = state;

  useEffect(() => {
    actions.clearErrorMsg();
    actions.getMovies();    
    // check local storage for token
    const token = window.localStorage.getItem('token');
    if (token) {      
      actions.handleToken(token);
    }    
  }, []); 
  
  const handleClick = (e) => {   
    actions.addToFavorites(e.target.id);    
  }
  return (
    <>
      <Navbar />
      {
        errorMsg &&         
          <div>
            Error:
            { errorMsg.map(err => <p key={err.detail}>{err.detail}</p> )}
          </div>             
      }
      {
        state.message &&
        <div>
          Message: 
          {
            <p>{state.message}</p>
          }
        </div>
      }
      <div className="movie-container">      
        {
          isLoading 
            ? <h1>Loading...</h1>
            : (
              movies && movies.map( movie => (
                <div className="movie-card" key={movie.title}>
                  <span className="movie-title">{movie.title}</span>
                  <img src={movie.image} alt={movie.title} />
                  {
                    isLoggedIn && <button id={movie.id} onClick={handleClick}>Add to Favorites</button>
                  }
                  {
                    isLoggedIn && admin && <Link to={`/edit-movie/${movie.id}`}>Edit Movie</Link>
                  }
                </div>
              ))
            )
        }      
      </div>     
    </>
  );
}

export default MovieApp;
