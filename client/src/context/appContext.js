import { React, createContext, useState } from "react";

export const AppContext = createContext(null);

export function AppProvider(props) {
  const [state, setState] = useState({
    isLoading: false,
    isLoggedIn: false,
  }); 

  const actions = {
    addToFavorites: async (movieId, userId) => {
      // user id and movie id
      setState( prev => ({
        ...prev,
        isLoading: true,
        errorMsg: '',
      }));
      await fetch(`${process.env.REACT_APP_API_ROUTE}/movies/favorites`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "x-access-token": state.token,
        },
        body: JSON.stringify({movieId, userId})
      }).then( resp => resp.json())
        .then( data => {
          if (data.ok) {
            console.log(data);
            setState( prev => ({
              ...prev,
              isLoading: false,              
            }))
          } else {
            console.log('error', data);
            setState( prev => ({
              ...prev,
              isLoading: false,     
              errorMsg: data.err.detail,         
            }))
          }
        } )
    },
    getMovies: async () => {
      setState( prev => ({
        ...prev,
        isLoading: true,
      }));
      await fetch(`${process.env.REACT_APP_API_ROUTE}/movies`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then( resp => resp.json())
        .then( data => {
          if (data.ok) {
            setState( prev => ({
              ...prev,
              isLoading: false,
              movies: data.movies,
            }));
          } else {
            console.log(data.err);
          }
        })
        .catch( err => console.log('Error conecting to database.'))
    },
    handleLogin: async (email, password) => {     
      setState( prev => ({
        ...prev,
        isLoading: true,
      }));
      await fetch(`${process.env.REACT_APP_API_ROUTE}/users/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      })
        .then( resp => resp.json())
        .then(data => {
          if (data.ok) {
            console.log(data);
            setState(prev => ({
              ...prev,
              isLoading: false,
              token: data.token,
              isLoggedIn: true,
            }));             
          } else {          
            setState(prev => ({
              ...prev,
              isLoading: false,
              errorMsg: data.errors,
              authMessage: data.msg,
            }));          
          }
        })
        .catch( err => console.log('Error conecting to database.', err));
    },
    handleLogout: async () => {
      setState( prev => ({
        ...prev,
        isLoggedIn: false,
      }))
    }
  };

  return (
    <AppContext.Provider value={{state, actions}}>
      {props.children}
    </AppContext.Provider>
  );
}