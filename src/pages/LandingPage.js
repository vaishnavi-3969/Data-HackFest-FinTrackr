import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { faqs } from '../constants/faqs';
import Logo from '../assets/Logo.jpeg';

const FAQ = () => {
  const [expanded, setExpanded] = useState('');

  const toggleFAQ = (faqId) => {
    if (expanded === faqId) {
      setExpanded('');
    } else {
      setExpanded(faqId);
    }
  };

  const faqBackgroundStyle = {
    backgroundImage: `url('/FAQ.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  const faqTextStyle = {
    fontFamily: 'Jetbrains Mono, monospace',
  };

  return (
    <div className="bg-gray-100" style={faqBackgroundStyle}>
      <div className="container px-6 py-10 mx-auto text-center" style={faqTextStyle}>
        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white mb-6">FAQs</h1>
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <div>
          {faqs.map((faq) => (
            <div key={faq.id} className="mb-6">
              <button
                className="flex items-center focus:outline-none"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span className="text-blue-500 text-xl">
                  {expanded === faq.id ? '[-]' : '[+]'}
                </span>
                <h1 className="mx-4 text-xl text-gray-700 dark:text-white" style={faqTextStyle}>
                  {faq.question}
                </h1>
              </button>
              {expanded === faq.id && (
                <div className="mt-4">
                  <p className="max-w-3xl mx-4 text-left text-xl text-gray-700 dark:text-gray-400" style={faqTextStyle}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  const backgroundStyle = {
    backgroundImage: `url('/Hero-Background.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
  const logoStyle = {
    maxWidth: '200px', 
    padding:'10px'
  };
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative p-3"
      style={backgroundStyle}
    >
       <div style={logoStyle}>
        <img src={Logo} alt="Logo" />
      </div>
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

      <p
      className="text-gray-400 text-center absolute bottom-0 mb-4 text-sm"
      style={{ left: '50%', transform: 'translateX(-50%)' }}
    >
      FAQs Section ↓
    </p>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <LandingPage />
      <FAQ />
    </>
  );
}
