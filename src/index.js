import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { UserProvider } from './Contexts/UserContext';
import { SearchProvider } from './Contexts/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <SearchProvider>
        <App></App>
      </SearchProvider>
    </UserProvider>
  </React.StrictMode>
);

