import './App.css';
import Navbar from './Components/Common/Navbar';
import { Route, Routes, useNavigate } from "react-router-dom"
import { FaBookMedical  } from 'react-icons/fa';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import OpenRoute from './Components/Core/Auth/OpenRoute';
import Home from './Pages/Home';
import FooterBackground from './Components/Common/FooterBackground';
import { Link } from 'react-router-dom';
import PrivateRoute from './Components/Core/Auth/PrivateRoute';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "./slices/authSlice";       // adjust path as needed
import { setUser } from "./slices/profileSlice"; 
import VerifyEmail from './Pages/VerifyEmail';

function App() {
   const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token) {
      dispatch(setToken(JSON.parse(token)));
    }

    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);
  
  return (
    <div className="flex min-h-screen w-screen flex-col bg-white font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

{/* open routes for only the non loggedin users */}]
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
        <Route
        path="verify-email"
        element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
        }
        />

{/* Private routes for only loggin in users */}
<Route
          element={
            <PrivateRoute>
              {/* <Dashboard /> */}
            </PrivateRoute>
          }
        ></Route>
      </Routes>
      <FooterBackground/>


      <Link to="./sellBooks">
      <button className="fixed bottom-10 right-10 w-[80px] h-[80px] bg-[#E74C3C] text-white rounded-full flex flex-col items-center justify-center hover:bg-[#b52417] shadow-lg text-sm font-medium text-center">
      <FaBookMedical  className="text-lg mt-1" />
        <span>Sell Books</span>
        
      </button>
    </Link>
    </div>

  );
}

export default App;
