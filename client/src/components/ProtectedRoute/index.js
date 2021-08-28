import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../context/appContext';

const ProtectedRoute = (props) => {
  const Component = props.component;
  const {state} = useContext(AppContext);
  
  if (state.isLoggedIn) {
    return <Component />;
  } else {
    return <Redirect to="/auth" />;
  }
};

export default ProtectedRoute;
