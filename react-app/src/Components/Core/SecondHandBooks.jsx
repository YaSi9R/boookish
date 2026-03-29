import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../services/operations/postAPI";

function SecondHandBooks() {
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSecondHand = async () => {
      const result = await dispatch(getAllPosts({ condition: "Used", limit: 8 }));
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
            <div
              key={index}
              className="card flex flex-col justify-between shadow hover:shadow-md cursor-pointer w-full flex-shrink-0 snap-start rounded-lg bg-white md:w-[250px] "
              style={{
                boxShadow:
                  'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px',
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={book.Images?.[0] || "/placeholder.svg"}
                  alt={`${book.Title} cover`}
                  className="w-full md:h-40 h-60 object-cover"
                />
              </div>
              <div className="mt-1 px-2 flex flex-col gap-1 pb-1">
                <p className="text-[#777777] text-xs">{book.Category}</p>
                <h3 className="text-lg font-light antialiased">
                  {book.Title?.length > 20
                    ? `${book.Title.slice(0, 30)}...`
                    : book.Title } 
                </h3>
              </div>
              <div className="px-2 py-2 mt-4">
                <p className="text-[#E74C3C] font-semibold antialiased">
                  ₹{book.Price}
                </p>
              </div>
            </div>
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