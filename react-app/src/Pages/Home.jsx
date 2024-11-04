import React from 'react';
import backgroundImage from '../assets/Images/website-background.png';
import SellButton from '../Components/Core/SellButton';
import { useState } from 'react';

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
              <input type="text" id="name" name="user_name" className="w-full p-2 border border-gray-300 text-sm" placeholder='What Are You Looking For...'/>
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
  );
};

export default Home;