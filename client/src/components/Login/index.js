import React, { useContext } from 'react'
import { AppContext } from '../../context/appContext'
import { useForm } from '../../hooks/useForm';

export const Login = () => {
  const {state, actions} = useContext(AppContext);
  const [formValues, handleInputChange, reset] = useForm({
    email: '',
    password: '',
  });
  const {email, password} = formValues;
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.handleLogin(email, password);
    reset();
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
              autoComplete="off"
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

          {/* <Link to="/register">Register</Link> */}
        </form>
      </div>
      {
        state.errorMsg &&         
          <div>
            Error:
            { state.errorMsg.map(err => <p key={err.param}>{err.msg}</p> )}
          </div>             
      }
    </div>
  )
}
