import React from 'react'
import backgroundImage from "../assets/Images/website-background.png";
const Home = () => {
  return (
    <div className="relative overflow-hidden h-screen">
    <img
      src={backgroundImage}
      alt="backgroundImage"
      className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
    />
  </div>
  

  )
}

export default Home
