import React, { useState, useRef, useEffect } from 'react';
import image1 from '../../assets/Images/image.jpg';

function SecondHandBooks() {
  const books = [
    {
        id: 1,
        title: "Mathematics Class XI",
        category: "Computer/Information Technology",
        price: "Price On Call",
        location: "Kolkata, West Bengal",
        datePosted: "December 17, 2024",
        views: 17,
        imageUrl: image1,
    },
    {
        id: 2,
        title: "It Ends With Us (Collection)",
        category: "Fiction Stories",
        price: "₹2,000 (Negotiable)",
        location: "Faridabad, Haryana, India",
        datePosted: "December 17, 2024",
        views: 22,
        imageUrl: image1,
    },
    {
        id: 3,
        title: "Objective NCERT at Your Fingertips",
        category: "Medical Competitive Exam",
        price: "₹700 (Fixed)",
        location: "Gobichettipalayam, Erode",
        datePosted: "December 16, 2024",
        views: 12,
        imageUrl: image1,
    },
    {
        id: 4,
        title: "Wave and Thermodynamics",
        category: "Others Engineering",
        price: "Price On Call",
        location: "Lucknow",
        datePosted: "December 16, 2024",
        views: 17,
        imageUrl: image1,
    },
    {
        id: 5,
        title: "Programming With JAVA",
        category: "Computer/Information Technology",
        price: "Price On Call",
        location: "Kolkata, West Bengal",
        datePosted: "December 17, 2024",
        views: 17,
        imageUrl: image1,
    },
    {
        id: 6,
        title: "The Haunted Hill House",
        category: "Fiction Stories",
        price: "₹2,000 (Negotiable)",
        location: "Faridabad, Haryana, India",
        datePosted: "December 17, 2024",
        views: 22,
        imageUrl: image1,
    },
    {
        id: 7,
        title: "Biology NEET Questions On Your FingerTips",
        category: "Medical Competitive Exam",
        price: "₹700 (Fixed)",
        location: "Gobichettipalayam, Erode",
        datePosted: "December 16, 2024",
        views: 12,
        imageUrl: image1,
    },

];

const sliderRef = useRef(null);

// Duplicate books for infinite scroll
const extendedBooks = [...books, ...books];

const handleScroll = (direction) => {
  const slider = sliderRef.current;
  const cardWidth = slider.firstChild.offsetWidth + 16; // Add margin/gap if present
  if (direction === 'left') {
    if (slider.scrollLeft === 0) {
      slider.scrollLeft = slider.scrollWidth / 2; // Reset to end for infinite effect
    }
    slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  } else {
    if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
      slider.scrollLeft = slider.scrollWidth / 2 - slider.offsetWidth; // Reset to start for infinite effect
    }
    slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }
};

useEffect(() => {
  const autoScroll = setInterval(() => handleScroll('right'), 2000);
  return () => clearInterval(autoScroll);
}, []);

return (
  <div className="container bg-[#f0f0f0] py-10 relative " style={{
    background: `rgba(240, 240, 240, 1)  center center / cover no-repeat`,
    minHeight: '650px', // Increase height here
  }}>

    <div className="w-9/12 mx-auto py-6">
      <h2 className="text-2xl antialiased text-left my-6 flex flex-col">
        Buy Second Hand Books
        <span className="w-[260px] h-[4px] my-10 overflow-hidden bg-[#b62323] mt-2 rounded-sm"></span>
      </h2>

      <div className="relative ">
        {/* Left Button */}
        <button
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-[#E74C3C] shadow-lg p-2 rounded-lg hover:bg-gray-200 z-10"
          onClick={() => handleScroll('left')}
        >
          {'<'}
        </button>

        {/* Scrollable Block */}
        <div
          ref={sliderRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide "
          style={{ scrollBehavior: 'smooth' }}
        >
          {extendedBooks.map((book, index) => (
            <div
              key={index}
              className="card flex flex-col justify-between shadow hover:shadow-md cursor-pointer rounded-lg bg-white min-w-[250px]"
              style={{
                boxShadow:
                  'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px',
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={book.imageUrl}
                  alt={`${book.title} cover`}
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="mt-1 px-2 flex flex-col gap-1 pb-1">
                <p className="text-[#777777] text-xs">{book.category}</p>
                <h3 className="text-lg font-light antialiased">
                  {book.title.length > 20
                    ? `${book.title.slice(0, 30)}...`
                    : book.title}
                </h3>
              </div>
              <div className="px-2 py-2 mt-4">
                <p className="text-[#E74C3C] font-semibold antialiased">
                  {book.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-[#E74C3C] shadow-lg p-2 rounded-lg hover:bg-gray-200 z-10"
          onClick={() => handleScroll('right')}
        >
          {'>'}
        </button>
      </div>
    </div>
  </div>
);
}

export default SecondHandBooks;