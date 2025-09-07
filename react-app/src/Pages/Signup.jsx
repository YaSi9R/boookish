import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

import bgImage from "../assets/Images/login.jpg"
import logo from "../assets/logo/Screenshot 2025-04-05 184152.png"
import mobile from "../assets/Images/mobile.png"
import chat from "../assets/Images/chat.png"
import globalImg from "../assets/Images/global.png"
import user from "../assets/Images/userSupport.png"
import LoadingModal from "../Components/Common/LoadingModal";

import GoogleSighnIn from "../Components/Common/GoogleSighnIn"
import { setLoading, setSignupData } from '../slices/authSlice'
import { sendOtp } from '../services/operations/authAPI'

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    Name: "",
    contactNumber: "",
    email: "",
    password: ""
  })

  const [isChecked, setChecked] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const changeHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { Name, contactNumber, email, password } = formData;

      if (!Name || !contactNumber || !email || !password) {
        toast.error("All fields are required");
        return;
      }

      if (!isChecked) {
        toast.error("You must agree to Terms & Conditions");
        return;
      }

      const signupData = {
        ...formData,
        accountType: "Student"
      };

      dispatch(setSignupData(signupData));
      const result = await dispatch(sendOtp(email, navigate));
      if (result) {
        toast.success("OTP sent to your email");
      }


      setFormData({
        Name: "",
        contactNumber: "",
        email: "",
        password: ""
      });
      setChecked(false);
    } catch (error) {
      console.error("Signup failed sighnup.jsx:", error);
      toast.error("Something went wrong during signup");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="parallex section-padding w-full h-[100px] flex items-center justify-center"
        style={{
          background: `rgba(0,0,0,0) url(${bgImage}) center center no-repeat`,
          backgroundSize: "cover"
        }}>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-[40px] p-6 bg-white justify-between items-center min-h-screen shadow-lg mx-auto w-11/12 md:w-9/12">
        {/* Left Section */}
        <div className="flex flex-col max-w-full md:max-w-[600px]">
          <h2 className="text-2xl text-left font-light">Register With Us</h2>
          <span className="bg-[#b62323] w-[200px] h-[4px] mt-2 rounded"></span>

          <div className="flex flex-col gap-6 pt-10">
            {[{
              img: logo, title: "Better Bookish V2", desc: "Posting ads is now Butter-flow."
            }, {
              img: mobile, title: "Avoid Calls", desc: "Use in-built Chat System."
            }, {
              img: chat, title: "Chat & Messaging", desc: "Access your chats from any device."
            }, {
              img: globalImg, title: "User Dashboard", desc: "Report or wishlist any Ad."
            }, {
              img: user, title: "User Friendly Support", desc: "Report us if you're stuck."
            }].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <img src={item.img} alt={item.title} className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]" />
                <div>
                  <h2 className="text-lg md:text-xl text-black font-light">{item.title}</h2>
                  <p className="text-[#777777] text-sm md:text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full max-w-[400px] md:max-w-[500px] flex flex-col">
          <GoogleSighnIn />

          <div className="flex items-center gap-2 w-full my-4">
            <span className="bg-[#777777] h-[1px] w-full"></span>
            <p className="text-black text-sm font-light">OR</p>
            <span className="bg-[#777777] h-[1px] w-full"></span>
          </div>

          <form onSubmit={submitHandler}>
            {/* Name */}
            <label htmlFor="Name" className="block mt-4 font-normal">Name</label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={changeHandler}
              required
              className="w-full p-2 border border-gray-300"
              placeholder="Name"
            />

            {/* Contact Number */}
            <label htmlFor="contactNumber" className="block mt-8 font-normal">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={changeHandler}
              required
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Contact Number"
            />

            {/* Email */}
            <label htmlFor="email" className="block mt-4 font-normal">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              required
              className="w-full p-2 border border-gray-300"
              placeholder="Email"
            />

            {/* Password */}
            <label htmlFor="password" className="block mt-8 font-normal relative">Password
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                required
                className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Password"
              />
              <span className="absolute right-3 top-[48px] transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(prev => !prev)}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </label>

            {/* Terms */}
            <div className="flex items-center mt-4 justify-between w-full">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-red-500"
                  checked={isChecked}
                  onChange={() => setChecked(prev => !prev)}
                />
                <span className="text-sm font-medium">
                  I agree to <a href="conditions.pdf" className="text-[#E74C3C]">Terms & Conditions</a>
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full py-2 mt-10 transition duration-300 rounded
              ${isChecked
                  ? 'bg-[#E74C3C] text-white hover:bg-red-600 cursor-pointer'
                  : 'bg-[#daaaaa] text-black opacity-50 cursor-not-allowed'}`}
              disabled={!isChecked}
            >
              Register
            </button>
          </form>
        </div>
      </div>
      {isLoading && <LoadingModal color="#E74C3C" size={40} />}

    </>
  )
}

export default Signup
