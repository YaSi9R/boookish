import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../services/operations/postAPI";
import HomeCard from "./HomeCard";

function SecondHandBooks() {
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSecondHand = async () => {
      const result = await dispatch(getAllPosts({ condition: "Used", limit: 8, sort: "likes" }));
      if (result && result.length > 0) {
        setBooks(result);
      }
    };
    fetchSecondHand();
  }, [dispatch]);

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
  const slider = sliderRef.current;

  const autoScroll = setInterval(() => {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1) {
      slider.scrollLeft = 0; 
    } else {
      handleScroll('right');
    }
  }, 3000);

  return () => clearInterval(autoScroll);
}, []);


return (
  <div className="container bg-[#f0f0f0] py-10 relative " style={{
    background: `rgba(240, 240, 240, 1)  center center / cover no-repeat`,
    minHeight: '650px', // Increase height here
  }}>

    <div className="w-9/12  mx-auto py-6">
      <h2 className="text-2xl antialiased text-left my-6 flex flex-col">
        Buy Second Hand Books
        <span className="w-[260px] h-[4px] my-10 overflow-hidden bg-[#b62323] mt-2 rounded-sm"></span>
      </h2>

      <div className="relative ">
        {/* Left Button */}
        <button
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-[#E74C3C] shadow-lg p-2 ml-3 rounded-lg hover:bg-gray-200 z-10"
          onClick={() => handleScroll('left')}
        >
          {'<'}
        </button>

        {/* Scrollable Block */}
        <div
          ref={sliderRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {extendedBooks.map((book, index) => (
            <HomeCard key={index} book={book} isSlider={true} />
          ))}
        </div>

        {/* Right Button */}
        <button
          className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-[#E74C3C] shadow-lg p-2 ml-8 rounded-lg hover:bg-gray-200 z-10 mr-3"
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