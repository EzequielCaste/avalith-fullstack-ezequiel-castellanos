import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import { AppContext } from "./context/appContext";


function MovieApp() {
  const {state, actions} = useContext(AppContext);
  const {movies, isLoading} = state;

  useEffect(() => {
    actions.getMovies();    
  }, []); 
 

  return (
    <>
      <Navbar />
      <div>      
        {
          isLoading 
          ? <h1>Loading...</h1>
          : (movies && movies.map( movie => <p key={movie.title}> {movie.title}</p>))
        }      
      </div>
    </>
  );
}

export default MovieApp;
