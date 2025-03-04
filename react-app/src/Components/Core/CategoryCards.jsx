import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../assets/iconsImage/open-book.png';
import image2 from '../../assets/iconsImage/medical-book.png';
import image3 from '../../assets/iconsImage/Competitive.png';
import image4 from '../../assets/iconsImage/Stories.png';
import image5 from '../../assets/iconsImage/magazines.png';
import image6 from '../../assets/iconsImage/SchoolBooks.png';

function CategoryCards() {
  const categories = [
    {
      id: '1',
      image: image2,
      title: 'Medical',
      ads: '483 Ads',
      description: 'Homeopathy, MBBS, Medicine, Nursing',
      bgColor: 'bg-[#d5658d]',
    },
    {
      id: '2',
      image: image1,
      title: 'Engineering Exams',
      ads: '325 Ads',
      description: 'Mechanical, Civil, Electrical, Computer Science',
      bgColor: 'bg-[#9b59b6]',
    },
    {
      id: '3',
      image: image3,
      title: 'Competitive Exams',
      ads: '2150 Ads',
      description: 'CAT|GATE|GRE, Engineering Exams, IBPS PO, Management',
      bgColor: 'bg-[#2ecc71]',
    },
    {
      id: '4',
      image: image4,
      title: 'Stories',
      ads: '707 Ads',
      description: 'Comics, Fiction, Non-Fiction, Others',
      bgColor: 'bg-[#3498db]',
    },
    {
      id: '5',
      image: image5,
      title: 'Magazines',
      ads: '51 Ads',
      description: 'Automobile, Bollywood/Hollywood, Business & Law, Education',
      bgColor: 'bg-[#f05458]',
    },
    {
      id: '6',
      image: image6,
      title: 'SchoolBooks',
      ads: '5001 Ads',
      description: 'Arts, Commerce, Science, Others',
      bgColor: 'bg-[#34495e]',
    },
  ];

  return (
    <div className="relative">
      {/* Desktop View (Auto-Scrolling Animation) */}
      <div className="hidden sm:flex overflow-hidden">
        <div className="flex gap-0 animate-scroll">
          {[...categories, ...categories].map((category, index) => (
            <div
              key={index}
              className={`flex-none w-[280px] md:w-[380px] h-[280px] md:h-[340px] flex flex-col items-center pt-6 md:pt-9 text-white ${category.bgColor}`}
            >
              <img
                src={category.image}
                alt={`${category.title} icon`}
                className="w-12 h-12 md:w-16 md:h-16 mb-4"
                style={{ filter: 'invert(1) brightness(2)' }}
              />
              <h3 className="text-xl md:text-2xl font-semibold mb-1">{category.title}</h3>
              <p className="text-base md:text-lg mb-2">{category.ads}</p>
              <p className="text-xs md:text-sm mb-4 md:mb-6 text-center px-2">
                {category.description}
              </p>
              <Link to={category.title}>
                <button className="border border-white px-3 py-1 md:px-4 md:py-2 hover:bg-white hover:text-black transition">
                  VIEW ALL
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View (Swipeable Scroll) */}
      <div className="sm:hidden overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex-none w-[90%] h-[340px] flex flex-col p-5 m-5 items-center justify-center text-white ${category.bgColor} space-y-2 `}
            >
              <img
                src={category.image}
                alt={`${category.title} icon`}
                className="w-16 h-16 mb-4"
                style={{ filter: 'invert(1) brightness(2)' }}
              />
              <h3 className="text-2xl font-semibold mb-2">{category.title}</h3>
              <p className="text-lg mb-2">{category.ads}</p>
              <p className="text-sm mb-6 text-center px-4 whitespace-normal break-words">{category.description}</p>
              <Link to={category.title}>
                <button className="border border-white px-4 py-2 hover:bg-white hover:text-black transition">
                  VIEW ALL
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for auto-scrolling animation */}
      <style jsx>{`
        .animate-scroll {
          display: flex;
          animation: scroll 18s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export default CategoryCards;
