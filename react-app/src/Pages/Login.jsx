import React from 'react'
import bgImage from "../assets/Images/login.jpg";
const Login = () => {
  return (
    <div className='relative flex flex-col items-center justify-center'>
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
      <div className="absolute top-1/3 w-10/12 flex flex-row gap-8 p-6 bg-white shadow-lg rounded-lg">
       
        <div className="h-[500px] w-[400px] flex flex-col">
          <h2 className="text-2xl font-semibold text-left">
            Sign In To Your Account
          </h2>
          <span className="w-[255px] h-[4px] bg-[#b62323] mt-2 rounded"></span>
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <label htmlFor="password" className="block text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
