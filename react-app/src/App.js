import './App.css';
import Navbar from './Components/Common/Navbar';
import { Route, Routes, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import OpenRoute from './Components/Core/Auth/OpenRoute';
import Error from './Pages/Error';
import Home from './Pages/Home';
import FooterBackground from './Components/Common/FooterBackground';
import { Link } from 'react-router-dom';




function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-white font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />


        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

      </Routes>
      <FooterBackground/>


       <Link to="./sellBooks">
              <button className="fixed bottom-5 right-5 bg-[#E74C3C] text-white py-3 px-6 rounded-full hover:bg-[#b52417]" link to="./sellBooks">
                Sell Books
              </button></Link>
    </div>

  );
}

export default App;
