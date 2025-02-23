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
    </div>

  );
}

export default App;
