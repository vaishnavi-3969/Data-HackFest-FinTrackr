import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-4">
        <hr/>
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
                    <Link to="/privacy-policy" className="text-gray-400 hover:text-white hover:underline">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="text-gray-400 hover:text-white hover:underline">Terms of Service</Link>
                    <Link to="/contact" className="text-gray-400 hover:text-white hover:underline">Contact</Link>
                </div>
            </div>
            <div className="container mx-auto mt-4 text-center">
                <div className="text-gray-400 text-sm">
                    Follow us on social media:
                </div>
                <div className="flex justify-center mt-2">
                    <a href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:underline mx-2">
                        Twitter
                    </a>
                    <a href="https://www.facebook.com/yourfacebook" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:underline mx-2">
                        Facebook
                    </a>
                    <a href="https://www.linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:underline mx-2">
                        LinkedIn
                    </a>
                </div>
                <div className="mt-4">
                    <p className="text-gray-400 text-sm">
                        Subscribe to our newsletter for updates:
                    </p>
                    <div className="mt-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="p-2 rounded-md"
                        />
                        <button className="bg-blue-500 text-white p-2 rounded-md ml-2">Subscribe</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;