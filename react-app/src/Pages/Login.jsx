import React from 'react'
import bgImage from "../assets/Images/login.jpg";
const Login = () => {
  return (
    <div>
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
      <div className='flex flex-row content-center'>
        <div className='h-500px w-400px'>
          <h2 className="text-2xl antialiased text-left my-6 flex flex-col">
          Sign In To Your Account
          <span className="w-[255px] h-[4px] my-10 overflow-hidden bg-[#b62323] mt-2 rounded"></span>
        </h2>
        </div>
        <div className='h-500px w-400px '>
          <form action="/login">
          
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
