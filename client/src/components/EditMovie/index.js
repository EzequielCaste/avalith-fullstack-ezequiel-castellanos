import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/appContext'
import { useForm } from '../../hooks/useForm';

const EditMovie = (props) => {
  const {state, actions} = useContext(AppContext);
  const id = +props.match.params.id;
  
  const {isLoggedIn, admin, token, movies} = state;  

  useEffect( () => {    
    const token = window.localStorage.getItem('token');

    if (token) {      
      actions.handleToken(token);     
    } 

  }, []);  

  const movie = movies ? movies.find( movie => movie.id === id) : [];
  
  const initialState = {
    title: movie.title,
    image: movie.image,   
  }
 
  const [formValues, handleInputChange] = useForm(initialState);

  const {title, image} = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.edit(id, title, image, token);
  }
  
  if (isLoggedIn && admin) {
    return (
      <div>
        <h2 className="title">Edit Movie</h2>
        <form action="#" onSubmit={handleSubmit} className="">
          <div className="form-control">
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
          <div className="form-control">
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
          <button disabled={state.isLoading}>
            {state.isLoading ? 'Loading...' : 'Edit'}
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
    return null;
  }

}

export default EditMovie
