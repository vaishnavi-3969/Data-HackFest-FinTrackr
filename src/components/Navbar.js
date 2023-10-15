import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FaUser, FaSignOutAlt, FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.jpeg';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4 text-blue-700">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold flex"><div className='max-w-[50px] px-1'><img src={Logo} alt=''/></div>FinTrackr</div>
        {isAuthenticated ? (
          <div className="relative">
            <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
              <div className="mr-4">
                <FaUser className="inline" /> {user.name}
              </div>
              <FaCaretDown />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu absolute z-10 mt-2 p-2 bg-white text-blue-700 rounded-md shadow-md">
                <Link to="/" className="nav-link block mb-2">
                  Dashboard
                </Link>
                <Link to="view_profile" className="nav-link block mb-2">
                  View Profile
                </Link>
                <Link to="profile" className="nav-link block mb-2">
                  Edit Profile
                </Link>
                <Link to="visualizations" className="nav-link block mb-2">
                  Visualizations
                </Link>
                <Link to="transactions" className="nav-link block mb-2">
                  Transaction History
                </Link>
                <Link to="documents" className="nav-link block mb-2">
                  Documents
                </Link>
                <Link to="contact" className="nav-link block mb-2">
                  Contact
                </Link>
                <button
                  className="p-2 bg-red-500 text-white rounded-md w-full text-center hover:bg-red-600"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
