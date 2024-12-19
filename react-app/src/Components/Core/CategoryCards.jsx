import React, { useRef, useEffect } from 'react';
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
          id:'1',
          image: image2,
          title: 'Medical',
         
          ads: '483 Ads',
          description: 'Homeopathy, MBBS, Medicine, Nursing',
          bgColor: 'bg-[#d5658d]',
        },
        {
            id:'2',
          image: image1,
          title: 'Engineering Exams',
          ads: '325 Ads',
          description: 'Mechanical, Civil, Electrical, Computer Science',
          bgColor: 'bg-[#9b59b6]',
        },
        {
            id:'3',
          image: image3,
          title: 'Competitive Exams',
          ads: '2150 Ads',
          description: 'CAT|GATE|GRE, Engineering Exams, IBPS PO, Management',
          bgColor: 'bg-[#2ecc71]',
        },
        {
            id:'4',
          image: image4,
          title: 'Stories',
          ads: ' 707 Ads',
          description: 'Comics, Fiction, Non-Fiction, Others',
          bgColor: 'bg-[#3498db]',
        },
        {
            id:'5',
            image: image5,
            title: 'Magazines',
            ads: ' 51 Ads',
            description: 'Automobile, BollyWood/HollyWood, Business & Law, Education',
            bgColor: 'bg-[#f05458]',
          },
          {
            id:'6',
            image: image6,
            title: 'SchoolBooks',
            ads: ' 5001 Ads',
            description: 'Arts, Commerce, Science, Others',
            bgColor: 'bg-[#34495e]',
          },
      
    
    
      ];

  const scrollingCategories = [...categories, ...categories];

  return (
    <div className="relative overflow-hidden ">
      <div className="flex gap-0 animate-scroll">
        {scrollingCategories.map((category) => (
          <div
            key={category.id}
            className={`flex-none w-[380px] h-[340px] flex flex-col items-center pt-9  text-white ${category.bgColor}`}
          >
            <img src={category.image} alt={`${category.title} icon`} className="w-16 h-16 mb-4" style={{ filter: 'invert(1) brightness(2)' }} />
            <h3 className="text-2xl font-semibold mb-1">{category.title}</h3>
            <p className="text-lg mb-2">{category.ads}</p>
            <p className="text-sm mb-6 text-center">{category.description}</p>
            <Link to={category.title}>
            <button
              className="border border-white px-4 py-2  hover:bg-white hover:text-black transition"
              aria-label={`View all ads in ${category.title}`}
            >
              VIEW ALL
            </button>
            
            
            </Link>
            
          </div>
        ))}
        
      </div>
     


      {/* CSS for the scroll animation */}
      <style jsx>{`
        .animate-scroll {
          display: flex;
          animation: scroll 15s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%); /* Move left by half the duplicated content width */
          }
        }
      `}</style>
    </div>


  );
}

export default CategoryCards;
