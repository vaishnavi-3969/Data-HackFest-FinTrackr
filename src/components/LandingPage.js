import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  const backgroundStyle = {
    backgroundImage: `url('/Hero-Background.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative"
      style={backgroundStyle}
    >
      <h1 className="text-6xl text-white mb-8 font-bold jetbrains-mono">Personal Finance Tracker</h1>
      <div className="text-white flex flex-row items-center">
        <button
          className="bg-transparent text-xl text-white border border-white font-base py-6 px-16 rounded-lg hover:border-blue-500 hover:ring-2 ring-blue-500 hover:text-blue-500 transition duration-300 jetbrains-mono"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
        <button
          className="bg-transparent text-xl text-white border border-white font-base py-6 px-16 rounded-lg hover:border-green-500 hover:ring-2 ring-green-500 hover:text-green-500 ml-4 transition duration-300 jetbrains-mono"
          onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
