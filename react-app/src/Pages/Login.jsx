import React from 'react'
import bgImage from "../assets/Images/login.jpg";
import chatImg from "../assets/Images/chat.png";
import globalImg from "../assets/Images/global.png";
import locationImg from "../assets/Images/location.png";

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
      <div className=' flex top-1/3 w-9/12  flex-row gap-[220px] p-6  bg-white justify-left items-center min-h-screen shadow-lg mx-auto'>
        <div className="h-[500px] w-[400px] flex flex-col">
          <h2 className="text-2xl font-light text-left">
            Sign In To Your Account
          </h2>
          <span className="w-[275px] h-[4px] bg-[#b62323] mt-2 rounded"></span>

          <div className=''>
            <div>
              <img src={chatImg} alt="" />
            </div>
            <div>
              <h3></h3>
              <p></p>
            </div>
          </div>
          <div className=''>
            <div>
              <img src={globalImg} alt="" />
            </div>
            <div>
              <h3></h3>
              <p></p>
            </div>
          </div>
          <div className=''>
            <div>
              <img src={locationImg} alt="" />
            </div>
            <div>
              <h3></h3>
              <p></p>
            </div>
          </div>
        </div>





        <div className="h-[500px] w-[400px] flex flex-col justify-center">
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
