import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/appContext'
import { useForm } from '../../hooks/useForm';

const Login = () => {
  const {state, actions} = useContext(AppContext);  
  const [formValues, handleInputChange, reset] = useForm({
    email: 'eze@gmail.com',
    password: '',
  });
  
  const history = useHistory();

  const {email, password} = formValues;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.handleLogin(email, password);
    reset();    
    history.push('/home')
  };
  
  return (
    <div className="Form-container">
      <div className="Form-inner">
        <h1>Login</h1>
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
        state.authMessage &&
          <div>
            {state.authMessage}
          </div>
      }
    </div>
  )
  
}

export default Login;