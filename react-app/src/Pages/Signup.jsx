import React, { useState } from 'react'
import bgImage from "../assets/Images/login.jpg";
import logo from "../assets/logo/Screenshot 2025-04-05 184152.png"
import mobile from "../assets/Images/mobile.png"
import chat from "../assets/Images/chat.png"
import globalImg from "../assets/Images/global.png"
import user from "../assets/Images/userSupport.png"
import toast from 'react-hot-toast';
// import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import GoogleSighnIn from "../Components/Common/GoogleSighnIn";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: ""


  });


  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  function changeHandler(event) {
    setFormData((prev) => (
      {
        ...prev,
        [event.target.name]: event.target.value

      }
    ))
  }


  function submitHandler(event) {
    event.preventDefault();
    toast.success("Register Successfully");
    console.log(formData);
    setFormData({
      name: "",
      number: "",
      email: "",
      password: ""

    })

  }
  return (
    <>
      <div className="parallex section-padding w-full h-[100px] flex items-center justify-center"
        style={{
          background: `rgba(0,0,0,0) url(${bgImage}) center center no-repeat`,
          backgroundSize: "cover"
        }}>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-[40px] p-6 bg-white justify-between items-center min-h-screen shadow-lg mx-auto w-11/12 md:w-9/12">
        {/* Left section */}
        <div className="flex flex-col max-w-full md:max-w-[600px] ">
          <h2 className="text-2xl text-left font-light">Register With Us</h2>
          <span className="bg-[#b62323] w-[200px] h-[4px] mt-2 rounded"></span>
          <div className="flex flex-col gap-6 pt-10">
            {/* features */}
            <div className=" flex gap-4 items-center ">
              <img src={logo} alt="" className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]" />
              <div>
                <h2 className="text-lg md:text-xl text-black font-light">Better Bookish V2</h2>
                <p className="text-[#777777] text-sm md:text-base"> Bookish ruled out most of its previous drawbacks.Posting ads is now Butter-flow.</p>
              </div>
            </div>


            <div className=" flex gap-4 items-center ">
              <img src={mobile} alt="" className="w-[60px] h-[60px] md:w-[60px] md:h-[60px] ml-[14px]" />
              <div>
                <h2 className="text-lg md:text-xl text-black font-light">Avoid Calls</h2>
                <p className="text-[#777777] text-sm md:text-base"> No Compulsion of Providing mobile numbers. Use in-built Chat System.</p>
              </div>
            </div>





            <div className=" flex gap-4 items-center ">
              <img src={chat} alt="" className="w-[60px] h-[60px] md:w-[60px] md:h-[60px] ml-[14px]" />
              <div>
                <h2 className="text-lg md:text-xl text-black font-light">Chat & Messaging</h2>
                <p className="text-[#777777] text-sm md:text-base"> Access your chats and account info from any device.</p>
              </div>
            </div>


            <div className="flex gap-4 items-center">
              <img src={globalImg} alt="Dashboard" className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]" />
              <div>
                <h2 className="text-lg md:text-xl text-black font-light">User Dashboard</h2>
                <p className="text-[#777777] text-sm md:text-base">Dedicated profile section for user. Report or wishlist any Ad.</p>
              </div>
            </div>



            <div className="flex gap-4 items-center">
              <img src={user} alt="Dashboard" className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]" />
              <div>
                <h2 className="text-lg md:text-xl text-black font-light">User Friendly Support</h2>
                <p className="text-[#777777] text-sm md:text-base">Let's improve bookish together.Report Us If you stuck somewhere.</p>
              </div>
            </div>


          </div>
        </div>
        {/* Right section */}

        <div className="w-full max-w-[400px] md:max-w-[500px] flex flex-col">
          <GoogleSighnIn />
          <div className="flex items-center gap-2 w-full my-4">
            <span className="bg-[#777777] h-[1px] w-full"></span>
            <p className="text-black text-sm font-light">OR</p>
            <span className="bg-[#777777] h-[1px] w-full"></span>
          </div>

          <form onSubmit={submitHandler}>
            <label htmlFor="name" className="block mt-4 font-normal">Name</label>
            <input
              type="name"
              id="name"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              required
              className="w-full p-2 border border-gray-300"
              placeholder='Name'
            />

            <label htmlFor="number" className="block mt-8 font-normal">Contact Number</label>
            <input
              type="number"
              id="number"
              name="number"
              required
              onChange={changeHandler}
              value={formData.number}
              className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder='Contact Number'
            />
            <label htmlFor="email" className="block mt-4 font-normal">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              required
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300"
              placeholder='Email'
            />

            <label htmlFor="password" className="block mt-8 font-normal relative">Password
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                required
                className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder='Password'

              />
              <span className="absolute right-3 top-[48px] transform -translate-y-1/2 cursor-pointer text-gray-600"
               onClick={()=>{setShowPassword(prev=>!prev)}}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </label>
            <div className="flex items-center mt-4 justify-between w-full">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-red-500" checked={isChecked} onChange={() => setChecked(prev => !prev)} />
                <span className="text-sm font-medium">I agree to
                  <a href="conditions.pdf" className='text-[#E74C3C]'>Terms & Conditions</a>
                </span>
              </label>
            </div>

            <button type="submit" className={`w-full py-2 mt-10 transition duration-300 rounded 
    ${isChecked
                ? 'bg-[#E74C3C] text-white hover:bg-red-600 cursor-pointer'
                : 'bg-[#daaaaa] text-black opacity-50 cursor-not-allowed'}`} disabled={!isChecked}>
              Login
            </button>
          </form>


        </div>
      </div>
    </>
  )
}

export default Signup
