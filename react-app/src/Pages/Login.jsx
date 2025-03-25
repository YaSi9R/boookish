import React from 'react'
import bgImage from "../assets/Images/login.jpg";
import chatImg from "../assets/Images/chat.png";
import globalImg from "../assets/Images/global.png";
import locationImg from "../assets/Images/location.png";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  return (
    <>
      <div
        className="parallex section-padding relative w-full md:h-[100px] h-[100px] flex items-center justify-center"
        style={{
          background: `rgba(0, 0, 0, 0) url(${bgImage}) center center no-repeat`,
          WebkitBackgroundSize: "cover",
          MozBackgroundSize: "cover",
          OBackgroundSize: "cover",
          backgroundSize: "cover",
        }}
      >

      </div>

      {/* Login container */}
      <div className=' flex top-1/3 w-9/12  flex-row gap-[40px] p-6  bg-white justify-between items-center min-h-screen shadow-lg mx-auto'>
        {/* left Part og login */}
        <div className="h-[500px] w-[600px] flex flex-col ">
          <h2 className="text-2xl font-light text-left">
            Sign In To Your Account
          </h2>
          <span className="w-[275px] h-[4px] bg-[#b62323] mt-2 rounded"></span>

          <div className='flex flex-row gap-6 pt-10 w-full '>
            <div className='w-[80px] h-[80px]'>
              <img src={chatImg} alt="" />
            </div>
            <div className='w-full flex-1'>
              <h2 className='text-xl text-black font-light'>Chat & Messaging</h2>
              <p className='text-[#777777] w-full'>Experience new inbuilt features.Access your chats and account info from any device.</p>
            </div>
          </div>
          <div className='flex flex-row gap-6 pt-10 w-full'>
            <div className='w-[80px] h-[80px] object-cover pl-2'>
              <img src={globalImg} alt=""
                className="w-[80px] h-[80px] object-cover  scale-140  " />
            </div>
            <div>
              <h2 className='text-xl text-black font-light'>User Dashboard</h2>
              <p className='text-[#777777] w-full'>Dedicated profile section for user.Report or wishlist any Ad.</p>
            </div>
          </div>
          <div className='flex flex-row gap-6 pt-10 w-full'>
            <div className='w-[80px] h-[80px] object-cover pl-2'>
              <img src={locationImg} alt=""
                className='w-[80px] h-[80px] object-cover scale-140' />
            </div>
            <div>
              <h3 className='text-xl text-black font-light'>All Over The World</h3>
              <p className='text-[#777777] w-full'>Each and every city covered via google.So whereever you are just start Book flowing.</p>
            </div>
          </div>
        </div>



        {/* Right part of my login page */}
        <div className="h-[500px] w-[500px] flex flex-col justify-center">
          <button className='text-left flex flex-row h-5 border'>
            {/* icon */}
            <FcGoogle className='' />

            Sign In with Google</button>
          <span className='bg-[#777777] w-full h-[1px]'></span>
          <p className='justify-center items-center text-center'>OR</p>
          <span className='bg-[#777777] w-full h-[1px]'></span>
          <form action="/login" className="space-y-4">
            <label htmlFor="email" className="block text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <label htmlFor="password" className="block text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              type="submit"
              className="w-full bg-[#E74C3C] text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              Login
            </button>
          </form>
        </div>

      </div>
    </>
  )
}

export default Login
