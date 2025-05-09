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



function App() {
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
