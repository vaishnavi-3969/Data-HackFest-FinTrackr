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










// import React from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
//
// const LandingPage = () => {
//   const { loginWithRedirect } = useAuth0();
//
//   const backgroundStyle = {
//     backgroundImage: `url('/Hero-Background.jpg')`,
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//   };
//
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gray-100"
//       style={backgroundStyle}
//     >
//       <div className="bg-white rounded-lg p-8 shadow-md text-center">
//         <h1 className="text-4xl mb-8">Personal Finance Tracker</h1>
//         <button
//           className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4"
//           onClick={() => loginWithRedirect()}
//         >
//           Log In
//         </button>
//         <button
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-4"
//           onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
//         >
//           Register
//         </button>
//         <p className="text-sm mt-4">
//           Image by{' '}
//           <a
//             href="https://www.freepik.com/free-vector/abstract-futuristic-background_6413323.htm#query=blue%20hero%20background%20futuristic&position=14&from_view=search&track=ais"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Freepik
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };
//
// export default LandingPage;
