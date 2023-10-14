import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../db/Firebase';
import { getDatabase, ref, push } from 'firebase/database';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubscribe = async () => {
    const db = getDatabase(app);
    const subscribersRef = ref(db, 'subscribers');

    try {
      await push(subscribersRef, {
        email: email,
        timestamp: new Date().toString(),
      });

      setEmail('');
      setSubscribed(true);
      setSuccessMessage('Thanks for subscribing!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error subscribing:', error);
      setErrorMessage('Error subscribing. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <footer className="bg-white text-black p-4">
      <hr />
      <div className="container mx-auto flex flex-wrap justify-between items-center p-5">
        <div className="text-left">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} FinTrackr. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Made with ❤️ using React.js and Firebase
          </p>
        </div>
        <div className="flex space-x-4">
          <Link to="/privacy-policy" className="text-gray-400 hover:text-black hover:underline">Privacy Policy</Link>
          <Link to="/terms-of-service" className="text-gray-400 hover:text-black hover:underline">Terms of Service</Link>
          <Link to="/contact" className="text-gray-400 hover:text-black hover:underline">Contact</Link>
        </div>
      </div>
      <div className="container mx-auto mt-4 text-center">
        <div className="text-gray-400 text-sm">
          Follow us on social media:
        </div>
        <div className="flex justify-center mt-2">
          <a href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black hover:underline mx-2">
            Twitter
          </a>
          <a href="https://www.facebook.com/yourfacebook" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black hover:underline mx-2">
            Facebook
          </a>
          <a href="https://www.linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black hover:underline mx-2">
            LinkedIn
          </a>
        </div>
        <div className="mt-4">
          {subscribed ? (
            <p className="text-black text-sm">{successMessage}</p>
          ) : (
            <div>
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              <p className="text-gray-400 text-sm">
                Subscribe to our newsletter for updates:
              </p>
              <div className="mt-2 flex items-center flex">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 rounded-md"
                />
                <button onClick={handleSubscribe} className="bg-blue-500 text-white p-2 rounded-md ml-2">
                  Subscribe
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
