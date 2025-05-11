import React, { useState } from "react";
import bgImage from "../assets/Images/login.jpg";
import chatImg from "../assets/Images/chat.png";
import globalImg from "../assets/Images/global.png";
import locationImg from "../assets/Images/location.png";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { login } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";
import LoadingModal from "../Components/Common/LoadingModal"; // Import the LoadingModal

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  function changeHandeler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
await dispatch(login(email, password, navigate));
    setFormData({
      email: "",
      password: "",
    });
    } 
    catch(error) {
      console.error("lofin Failed",error);
    }
    finally {
    setIsLoading(false); // Hide loading spinner after dispatch
  }
}

  return (
    <>
      {/* Background Image Section */}
      <div
        className="parallex section-padding w-full h-[100px] flex items-center justify-center"
        style={{
          background: `rgba(0, 0, 0, 0) url(${bgImage}) center center no-repeat`,
          backgroundSize: "cover",
        }}
      ></div>

      {/* Login container */}
      <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-[40px] p-6 bg-white justify-between items-center min-h-screen shadow-lg mx-auto w-11/12 md:w-9/12">
        {/* Left Section */}
        <div className="max-w-full md:max-w-[600px] flex flex-col">
          <h2 className="text-2xl font-light text-left">Sign In To Your Account</h2>
          <span className="w-[275px] h-[4px] bg-[#b62323] mt-2 rounded"></span>

          <div className="flex flex-col gap-6 pt-10">
            {/* Feature 1 */}
            <div className="flex gap-4 items-center">
              <img
                src={chatImg}
                alt="Chat"
                className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
              />
              <div>
                <h2 className="text-lg md:text-xl text-black font-light">Chat & Messaging</h2>
                <p className="text-[#777777] text-sm md:text-base">
                  Experience new inbuilt features. Access your chats and account info from any device.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 items-center">
              <img
                src={globalImg}
                alt="Dashboard"
                className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
              />
              <div>
                <h2 className="text-lg md:text-xl text-black font-light">User Dashboard</h2>
                <p className="text-[#777777] text-sm md:text-base">
                  Dedicated profile section for user. Report or wishlist any Ad.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 items-center">
              <img
                src={locationImg}
                alt="Global"
                className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
              />
              <div>
                <h3 className="text-lg md:text-xl text-black font-light">All Over The World</h3>
                <p className="text-[#777777] text-sm md:text-base">
                  Each and every city covered via Google. So wherever you are, just start Book flowing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full max-w-[400px] md:max-w-[500px] flex flex-col">
          <button className="flex items-center justify-center gap-2 w-full py-2 border border-black shadow-md text-black font-medium">
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>

          <div className="flex items-center gap-2 w-full my-4">
            <span className="bg-[#777777] h-[1px] w-full"></span>
            <p className="text-black text-sm font-light">OR</p>
            <span className="bg-[#777777] h-[1px] w-full"></span>
          </div>

          <form onSubmit={submitHandler}>
            <label htmlFor="email" className="block mt-4 font-normal">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              required
              className="w-full p-2 border border-gray-300"
              placeholder="Enter Name"
              onChange={changeHandeler}
            />

            <label htmlFor="password" className="block mt-8 font-normal relative">
              Password
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={changeHandeler}
                required
                className="w-full p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Password"
              />
              <span
                className="absolute right-3 top-[48px] transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </label>
            <div className="flex items-center mt-4 justify-between w-full">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-red-500" />
                <span className="text-sm font-medium">Remember Me</span>
              </label>
              <button className="text-[#ff0000] font-medium text-sm hover:underline">Forgot Password?</button>
            </div>

            <button type="submit" className="w-full bg-[#E74C3C] text-white py-2 mt-10 hover:bg-red-600 transition">
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Loading Spinner (Modal with Opaque Background) */}
      {isLoading && <LoadingModal color="#E74C3C" size={40} />} {/* Adjust size as needed */}
    </>
  );
};

export default Login;
