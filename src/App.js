import React from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import LandingPage from './pages/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Homepage from './pages/HomePage';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import ViewProfile from './pages/ViewProfile';
import Error from './pages/Error';
import TransactionHistory from './pages/TransactionHistory';
import Cards from './pages/Cards';
import Documents from './pages/Documents';
import Visualization from './pages/Visualization';
import Contact from './pages/Contact';

function App() {
  const {isAuthenticated} = useAuth0();

  return (
    <div className="font-righteous antialiased  text-slate-400 bg-slate-900">
    <BrowserRouter>
    {isAuthenticated ? <Navbar/> : null}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Homepage/> : <LandingPage/>} exact/>
        <Route path="/profile" element={<Profile/>} exact/>
        <Route path="/view_profile" element={<ViewProfile/>} exact/>
        <Route path='*' element={<Error/>} exact/>
        <Route path="/visualizations" element={<Visualization/>} exact/>
        <Route path='/transactions' element={<TransactionHistory/>} exact/>
        <Route path='/cards' element={<Cards/>} exact/>
        <Route path='/documents' element={<Documents/>} exact/>
        <Route path="/contact" element={<Contact />} exact />
      </Routes>
     <Footer/>
    </BrowserRouter>
  </div>
  );
}

export default App;
