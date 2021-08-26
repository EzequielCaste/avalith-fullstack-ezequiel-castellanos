import React, { useContext, useEffect } from "react";
import { AppContext } from "./context/appContext";


function MovieApp() {
  const {state, actions} = useContext(AppContext);
  const {movies} = state;

  useEffect(() => {
    actions.getMovies();    
  }, []);


  return (
    <div>
      {
        movies &&
          movies.map( movie => <p key={movie.title}>{movie.title}</p>)
      }
    </div>
  );
}

export default MovieApp;
