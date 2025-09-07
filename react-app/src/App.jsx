"use client"

import "./App.css"
import Navbar from "./Components/Common/Navbar"
import { Route, Routes } from "react-router-dom"
import { FaBookMedical } from "react-icons/fa"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import OpenRoute from "./Components/Core/Auth/OpenRoute"
import Home from "./Pages/Home"
import FooterBackground from "./Components/Common/FooterBackground"
import { Link } from "react-router-dom"
import PrivateRoute from "./Components/Core/Auth/PrivateRoute"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setToken } from "./slices/authSlice"
import { setUser } from "./slices/profileSlice"
import VerifyEmail from "./Pages/VerifyEmail"
import Dashboard from "./Pages/Dashboard"
import Profile from "./Pages/Profile"
import Settings from "./Pages/Dashboard/Settings"
import MyPosts from "./Pages/Dashboard/MyPosts"
import SellBooks from "./Pages/SellBooks"
import EditPost from "./Pages/Dashboard/EditPost"
import Favorites from "./Pages/Dashboard/Favorites"
import PostDetails from "./Pages/PostDetails"
import AllPosts from "./Pages/AllPosts"
import Error from "./Pages/Error"

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if (token) {
      dispatch(setToken(JSON.parse(token)))
    }
    if (user) {
      dispatch(setUser(JSON.parse(user)))
    }
  }, [dispatch])

  return (
    <div className="flex min-h-screen w-screen flex-col bg-white font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/post/:id" element={<PostDetails />} />

        {/* Open routes for only non-logged-in users */}
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        {/* Private routes for only logged-in users */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<Profile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/my-posts" element={<MyPosts />} />
          <Route path="/dashboard/add-post" element={<SellBooks />} />
          <Route path="/dashboard/edit-post/:postId" element={<EditPost />} />
          <Route path="/dashboard/favorites" element={<Favorites />} />
        </Route>

        {/* 404 Error Route */}
        <Route path="*" element={<Error />} />
      </Routes>

      

      {/* Floating Sell Button */}
      {user && (
        <Link to="/dashboard/add-post">
          <button className="fixed bottom-10 right-10 w-[80px] h-[80px] bg-[#E74C3C] text-white rounded-full flex flex-col items-center justify-center hover:bg-[#b52417] shadow-lg text-sm font-medium text-center z-50">
            <FaBookMedical className="text-lg mt-1" />
            <span>Sell Books</span>
          </button>
        </Link>
      )}
    </div>
  )
}

export default App
