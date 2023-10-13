import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="font-righteous">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} exact/>
          <Route path="/homepage" element={<HomePage/>} exact/>
          <Route path="/profile" element={<Profile/>} exact/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
