import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { UserProvider } from './Contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App></App>
    </UserProvider>
  </React.StrictMode>
);

