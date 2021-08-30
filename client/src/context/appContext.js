import { React, createContext, useState } from "react";
import jwt from 'jsonwebtoken';
export const AppContext = createContext(null);

export function AppProvider(props) {  
  const [state, setState] = useState({
    isLoading: false,
    isLoggedIn: false,
    message: '',
    errorMsg: '',
    admin: false,
    authMessage: '',
  }); 

  const actions = {
    clearErrorMsg: () => {
      setState( prev => ({
        ...prev,
        message: '',
        errorMsg: '',
        authMessage: '',
      }));
    },
    edit: async (id, title, image, token) => {
      setState( prev => ({
        ...prev,
        isLoading: true,
        message: ''
      }));
      await fetch(`${process.env.REACT_APP_API_ROUTE}/movies/${id}`, {
        method: 'PUT',
        headers: {
          'content-type':  'application/json',
          'authorization': token,
        },
        body: JSON.stringify({title, image, id})
      }).then( resp => resp.json())
        .then( data => {
          if (data.ok) {            
            setState( prev => ({
              ...prev,
              isLoading: false,    
              message: 'Movie was edited'          
            }));
          }
        })
        .catch( err => {
          setState( prev => ({
            ...prev,
            isLoading: false,
            message: err
          }));          
        });
    },
    addToFavorites: async (movieId) => {   
      const token = window.localStorage.getItem('token');  
      setState( prev => ({
        ...prev,
        isLoading: true,
        errorMsg: '',
      }));      
      await fetch(`${process.env.REACT_APP_API_ROUTE}/movies/favorites`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "Authorization": token,
        },
        body: JSON.stringify({movieId})
      }).then( resp => resp.json())
        .then( data => {
          if (data.ok) {                   
            setState( prev => ({
              ...prev,
              isLoading: false,   
              message: data.msg,           
            }))
          } else {           
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
        .catch( err => console.log('Error conecting to database.', err))
    },
    getFavorites: async () => {
      const token = window.localStorage.getItem('token');

      setState( prev => ({
        ...prev,
        isLoading: true,
      }));      
      await fetch(`${process.env.REACT_APP_API_ROUTE}/movies/favorites`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          "Authorization": token,
        }
      })
        .then( resp => resp.json())
        .then( data => {         
          if (data.ok) {            
            setState( prev => ({
              ...prev,
              favorites: data.favorites,
              isLoading: false,
            }))
          } else {            
            setState( prev => ({
              ...prev,
              isLoading: false,
              errorMsg: data.msg,
            }))
          }
        }).catch( err => console.log([err]))
    },
    handleToken: async (token) => {
      const decoded = jwt.decode(token);
      setState( prev => ({
        ...prev,
        isLoading: false,
        isLoggedIn: true,
        admin: decoded.admin,
        token,
        favorites: decoded.favorites,
      }));
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
            setState(prev => ({
              ...prev,
              isLoading: false,
              token: data.token,
              isLoggedIn: true,
              admin: data.admin,
            }));       
            window.localStorage.setItem('token', data.token);           
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
      window.localStorage.clear();
      setState( prev => ({
        ...prev,
        favorites: '',
        isLoading: false,
        isLoggedIn: false,
        message: '',
        errorMsg: '',
        admin: false,
        authMessage: '',
      }));
    }
  };

  return (
    <AppContext.Provider value={{state, actions}}>
      {props.children}
    </AppContext.Provider>
  );
}