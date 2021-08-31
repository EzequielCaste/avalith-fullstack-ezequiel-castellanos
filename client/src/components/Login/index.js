import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../context/appContext'
import { useForm } from '../../hooks/useForm';

const Login = () => {
  const {state, actions} = useContext(AppContext);  

  const {isLoggedIn} = state;

  const [formValues, handleInputChange, reset] = useForm({
    email: 'eze@gmail.com',
    password: '',
  });  
 
  const {email, password} = formValues;
  
  const handleSubmit = (e) => {    
    e.preventDefault();    
    actions.handleLogin(email, password);
    reset();   
  };
  
  if (isLoggedIn) {
    return <Redirect to="/home" />;
  } else {

    return (
      <div className="Form-container">
        <div className="Form-inner">
          <h2 className="title">Login</h2>
          <form action="#" onSubmit={handleSubmit} className="">
            <div>
              <label>email: </label>
              <input
                required              
                autoComplete="on"
                name="email"
                type="text"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                required
                autoComplete="off"
                name="password"
                type="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <button disabled={state.isLoading}>
              {state.isLoading ? 'Loading...' : 'Sign In'}
            </button>
            
          </form>
        </div>
        {
          state.errorMsg &&         
            <div>
              Error:
              { state.errorMsg.map(err => <p key={err.msg}>{err.msg}</p> )}
            </div>             
        }
        {
          state.message &&
            <div>
              {state.message}
            </div>
        }
      </div>
    )
  }

  
}

export default Login;