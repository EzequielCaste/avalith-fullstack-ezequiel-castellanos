import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import {useForm} from '../../hooks/useForm';

const AddMovie = () => {
  const {state, actions} = useContext(AppContext);
  
  const {isLoading, isLoggedIn, admin} = state;

  useEffect( () => {    
    const token = window.localStorage.getItem('token');

    if (token) {      
      actions.handleToken(token);     
    } 
    
  }, []);

  const initialState = {
    title: '',
    image: ''
  };

  const [formValues, handleInputChange] = useForm(initialState);
  const {title, image} = formValues;
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.addMovie(title,image);
  }



  if (isLoggedIn && admin) {
    return (
      <div>
        <h1>Add Movie</h1>
        <form action="#" onSubmit={handleSubmit} className="">
          <div>
            <label>Title: </label>
            <input
              required              
              autoComplete="off"
              name="title"
              type="text"
              value={title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Image URL: </label>
            <input
              required
              autoComplete="off"
              name="image"
              type="text"
              value={image}
              onChange={handleInputChange}
            />
          </div>
          <button disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Add'}
          </button>
  
          {
            state.message && 
            <div>
              {state.message}
            </div>
          }
          <Link to="/home">Back</Link>
        </form>       
      </div>
    )
  } else {
    return (
      <div>
        <h1>Not authorized</h1>
        <Link to="/home">Back</Link>
      </div>
    )
  }

}

export default AddMovie
