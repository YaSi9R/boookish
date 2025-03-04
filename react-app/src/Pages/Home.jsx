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
import BuyNovelsBooks from '../Components/Core/BuyNovels';






// import { FaHandHoldingHeart } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { PiHandHeartThin } from "react-icons/pi";
import BuyNovels from '../Components/Core/BuyNovels';




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
      <div className="relative md:overflow-hidden md:h-screen max-sm:h-[900px] max-sm:overflow-hidden ">
        {/* Background Image */}
        <img
          src={backgroundImage}
          alt="background"
          className="md:w-full md:h-full max-sm:ml-[130px] h-[2024px] object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />

        {/* Overlay Content */}
        <div className="absolute w-full md:w-[1100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center gap-4 md:gap-20 z-10 p-4  md:mt-0">
          {/* Main Text Section */}
          <div className="text-black items-center justify-center  text-left bg-transparent  p-2 rounded-lg max-w-lg ">
            <h1 className="text-4xl font-bold mb-4 ">10000+ Used Books On <br /> Sale</h1>
            <span className="block w-16 h-1 bg-black  mb-4 "></span>
            <p className="md:mb-6 md:text-m text-lg max-sm:py-[20px]    ">
              Buy and Sell Used Books in India. Search and buy second-hand books near you. Post a free ad to sell old books in your city. Download the app now.
            </p>
            <SellButton />
          </div>

          {/* Contact Form Section */}
          <div className="text-black bg-white shadow-2xl p-4 md:p-8 rounded-lg w-full md:w-[500px] max-w-lg">
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
        className="parallex section-padding relative w-full md:h-[280px] h-[500px] flex items-center justify-center"
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
        <div className="container mx-auto md:mx-[150px] px-6 relative z-10 text-white text-center">
          {/* Row Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            {/* Left Section */}
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
              <div className="text-6xl sm:text-8xl mt-2 sm:mt-4">
                <PiHandHeartThin />
              </div>
              <div className="mt-4 sm:mt-5 sm:ml-4">
                <h4 className="italic text-2xl sm:text-4xl font-medium antialiased mb-2 sm:mb-4">
                  Where to sell used second-hand books?
                </h4>
                <p className="text-sm sm:text-base font-light">
                  Post an Ad now and one of you will be lucky to have your ad
                  featured. Featured Ads get more buyer interaction.
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex justify-center md:justify-end w-full h-auto md:w-[200px] min-h-[50px] sm:h-[60px]">
              <Link
                to="./sellBooks"
                className="btn bg-[#E74C3C] text-white px-4 py-2 sm:py-3 inline-flex items-center hover:bg-[#b52417] transition text-base sm:text-lg whitespace-nowrap"
              >
                Post Free Ad <FaAngleDoubleRight className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>




      <div>
        <BuyNovelsBooks />
      </div>




      <div>
        <Buyoldbooks />
      </div>



    </>

  );
};

export default Home;