import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppProvider } from './context/appContext';
import AppRouter from './router/AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
