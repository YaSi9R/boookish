import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/Images/website-background.png';
import sectionImage from '../assets/Images/middle_Bg.jpg';
import SellButton from '../Components/Core/SellButton';
import { useState } from 'react';
import CategoryCards from '../Components/Core/CategoryCards';
import FeaturedBooks from '../Components/Core/FeaturedBooks';
import SecondHandBooks from '../Components/Core/SecondHandBooks';
import Buyoldbooks from '../Components/Core/Buyoldbooks';
// import FooterBackground from '../Components/Common/FooterBackground';






import { FaHandHoldingHeart } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { PiHandHeartThin } from "react-icons/pi";




const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: 1, name: 'Fiction' },
    { id: 2, name: 'Non-Fiction' },
    { id: 3, name: 'Science' },
    { id: 4, name: 'Mathematics' },
    { id: 5, name: 'History' },
  ];
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <div className="relative overflow-hidden h-screen">
        {/* Background Image */}
        <img
          src={backgroundImage}
          alt="background"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />

        {/* Overlay Content */}
        <div className="absolute w-[1100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row items-center gap-20 z-10 p-4">
          {/* Main Text Section */}
          <div className="text-black bg-transparent  p-2 rounded-lg max-w-lg ">
            <h1 className="text-4xl font-bold mb-4">10000+ Used Books On <br /> Sale</h1>
            <span className="block w-16 h-1 bg-black  mb-4"></span>
            <p className="mb-6 text-m ">
              Buy and Sell Used Books in India. Search and buy second-hand books near you. Post a free ad to sell old books in your city. Download the app now.
            </p>
            <SellButton />
          </div>

          {/* Contact Form Section */}
          <div className="text-black bg-white shadow-2xl p-8 rounded-lg w-[500px] max-w-lg">
            <form action="/my-handling-form-page" method="post">
              <p className="mb-4">
                <label htmlFor="name" className="block text-sm ">Title</label>
                <input type="text" id="name" name="user_name" className="w-full p-2 border border-gray-300 text-sm" placeholder='What Are You Looking For...' />
              </p>
              <p className="mb-4">
                <label htmlFor="category" className="block text-sm mb-2 ">Select Category</label>
                <select
                  id="category"
                  name="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full p-2 border border-gray-300 text-[#8e8e8e]"
                >
                  <option value="" disabled >Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </p>
              <p className="mb-4">
                <label htmlFor="searchLocation" className="block text-sm">Location</label>
                <input type="text" id="searchLocation" name="searchLocation" className="w-full p-2 border border-gray-300 text-sm" placeholder='Location...' />
              </p>
              <button type="submit" className="mt-4 rounded  bg-[#E74C3C] text-sm text-white px-4 py-2 w-full hover:bg-[#b52417] ">SEARCH</button>
            </form>
          </div>
        </div>
      </div>



      <div className='flex flex-col '>
        <div className='h-2 bg-white'></div>
        <CategoryCards /> {/* Render the CategoryCards component */}
        <div className='h-2 bg-white'></div>

      </div>





      <div>
        <FeaturedBooks />

      </div>

      <div>
        <SecondHandBooks />
      </div>


      
      {/* Middle Background Section */}
      <div
        className="parallex section-padding relative w-full h-[280px] flex items-center justify-center"
        style={{
          background: `rgba(0, 0, 0, 0) url(${sectionImage}) center center no-repeat`,
          WebkitBackgroundSize: "cover",
          MozBackgroundSize: "cover",
          OBackgroundSize: "cover",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Content */}
        <div className="container mx-[150px] relative z-10 px-6 text-white text-center">
          {/* Row Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-6 text-center md:text-left">
              <div className="text-8xl mt-4">
              <PiHandHeartThin />
              </div>
              <div className='mt-5 ml-4'>
                <h4 className="italic text-4xl font-medium antialiased mb-4">
                  Where to sell used second-hand books?
                </h4>
                <p className="text-base  font-light">
                  Post an Ad now and one of you will be lucky to have your ad
                  featured. Featured Ads get more buyer interaction.
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex justify-center md:justify-end w-[200px] h-[60px]">
              <Link
                to="./sellBooks"
                className="btn bg-[#E74C3C] text-white px-4   inline-flex items-center hover:bg-[#b52417] transition text-lg"
              >
                Post Free Ad <FaAngleDoubleRight className="ml-1" />
              </Link>
            </div>




          </div>
        </div>
      </div>



      <div>
        <SecondHandBooks />
      </div>




      <div>
        <Buyoldbooks />
      </div>

      <div>
        {/* <FooterBackground /> */}
      </div>





      <Link to="./sellBooks">
        <button className="fixed bottom-5 right-5 bg-[#E74C3C] text-white py-3 px-6 rounded-full hover:bg-[#b52417]" link to="./sellBooks">
          Sell Books
        </button></Link>



    </>

  );
};

export default Home;