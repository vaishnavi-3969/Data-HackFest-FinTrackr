import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { authConfig } from './config';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Auth0Provider {...authConfig}>
      <LandingPage />
    </Auth0Provider>
  );
}

export default App;
