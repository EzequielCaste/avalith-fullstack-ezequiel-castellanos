import React, { useContext } from 'react'
import { Redirect } from 'react-router';

import { AppContext } from '../../context/appContext'
import { useForm } from '../../hooks/useForm';

const EditMovie = (props) => {
  const {state} = useContext(AppContext);
  const {isLoggedIn, admin, movies} = state;
  const id = +props.match.params.id;
  const movie = movies.find( movie => movie.id === id);
  const initialState = {
    title: movie.title,
    image: movie.image,
    tags: '',
  }
 
  const [formValues, handleInputChange, reset] = useForm(initialState);

  const {title, image, tags} = formValues;

  const handleSubmit = () => {

  }
  
  if (isLoggedIn && admin) {
    return (
      <div>
        <h1>Edit Movie</h1>
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
          <button disabled={state.isLoading}>
            {state.isLoading ? 'Loading...' : 'Edit'}
          </button>

          {/* <Link to="/register">Register</Link> */}
        </form>
      </div>
    )
  } else {
    return <Redirect to="/home" />
  }

}

export default EditMovie
