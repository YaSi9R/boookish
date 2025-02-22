import React from 'react';
import greenImg from "../../assets/iconsImage/green.png";
import yellowImg from "../../assets/iconsImage/yellow.png";
import { IoLogoAndroid } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";



function FooterBackground() {
  const steps = [
    {
      id: 1,
      title: "Simply Register",
      description: "Register via Bookish app or web. You can create account socially also.",
      icon: <IoLogoAndroid className="text-white text-5xl" />,
      color: "bg-[#FFA500]",
      imgSrc: yellowImg,
    },
    {
      id: 2,
      title: "Post Ad",
      description: "Fill required details and submit book ad you want to sell.",
      icon: <FaBook className="text-white text-4xl" />,
      color: "bg-[#9C27B0]",
      imgSrc: greenImg,
    },
    {
      id: 3,
      title: "Need Help?",
      description: "Wherever you stuck in process, just tap on floating chat icon on bottom left.",
      icon: <FaHeadset className="text-white text-4xl" />,
      color: "bg-[#4CAF50]",
      imgSrc: greenImg,
    },
  ];
  return (
    <>

    <div className="flex flex-col items-center text-center p-8">
      <h2 className="text-3xl font-light mb-8">
        How To <span className="text-[#F44336]">Sell Used Books</span> On BookFlow?
      </h2>
      <span className='w-[105px] h-[1px] bg-black rounded-lg'></span>
      <span className='mt-[5px] w-[50px] h-[1px] bg-black rounded-lg'></span>



      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex flex-row items-center p-6 rounded-lg "
          >


            <div className='flex flex-col'>
              <div className={`relative flex  items-center justify-center`}>
                {/* Full Circle with Border */}
                <div className={`w-32 h-32 rounded-full flex items-center justify-center relative  ${step.color}`}>

                  {/* Right-Side White Semi-Circle */}
                  <div className="absolute w-32 h-32 bg-white"
                    style={{
                      clipPath: "inset(0 0 0 50%)",  // Hides left half
                      // borderRadius: "50%",
                      position: "absolute"
                    }}>
                  </div>

                  {/* White Spacer (Ring Effect) */}
                  <div className="absolute w-28 h-28 bg-white rounded-full"></div>

                  {/* Inner Circle with Icon */}
                  <div className={`absolute w-24 h-24 rounded-full flex items-center justify-center ${step.color}`}>
                    <div className="text-white text-2xl">{step.icon}</div>
                  </div>

                  {/* small circle with id */}
                  <div className={`absolute w-10 h-10 rounded-full flex items-center justify-center ${step.color} overflow-hidden shadow-md z-10 border border-[5px] border-white`}
                    style={{
                      bottom: "4px",  // Position it slightly outside the bottom
                      right: "10px",   // Move it slightly outside the right
                    }}>
                    <div className={`text-xl  text-white font-bold ${step.color}`}>0{step.id}</div>
                  </div>

                </div>
              </div>



              <h3 className="text-xl font-light mt-4">{step.title}</h3>
              <p className="text-[#777777] mt-2">{step.description}</p>
            </div>

            
          </div>
        ))}
      </div>
    </div>






// Buttom container 





</>
  );
};


export default FooterBackground