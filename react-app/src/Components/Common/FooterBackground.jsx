import React from 'react';
import greenImg from "../../assets/iconsImage/green.png";
import yellowImg from "../../assets/iconsImage/yellow.png";
import { IoLogoAndroid } from "react-icons/io";

import { FaHeadset, FaFacebook, FaInstagram, FaTwitter, FaHeart, FaBook } from "react-icons/fa";




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
          How To <span className="text-[#F44336]">Sell Used Books</span> On BooKish?
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





      {/* Footer  */}
      <footer className="bg-black text-white py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="text-lg font-semibold mb-2">Best Recycle is Book Recycle</h3>
            <p>Keep Your Books Flowing.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Sell Old Books Online</h3>
            <p>
              Buy And Sell Used Books Online In India. Buy second-hand books and
              old books near you. Post free ads to sell books online in India.
            </p>
            <p>Click 'need help' for 24x7 customer care on WhatsApp.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <ul className="flex  flex-col gep-2">
              <li className="flex items-center gap-2">
                <a href="https://facebook.com" className="text-gray-400 hover:text-white flex items-center gap-2">
                  <FaFacebook className="text-blue-500" /> Facebook
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a href="https://instagram.com" className="text-gray-400 hover:text-white flex items-center gap-2">
                  <FaInstagram className="text-pink-500" /> Instagram
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a href="https://twitter.com" className="text-gray-400 hover:text-white flex items-center gap-2">
                  <FaTwitter className="text-blue-400" /> Twitter
                </a>
              </li>
            </ul>

          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="./about">About Bookish</a></li>
              <li><a href="./terms">Terms and Conditions</a></li>
              <li><a href="./privacyPolicy">Privacy Policy</a></li>
              <li><a href="./safety">Safety Tips</a></li>
              <li><a href="./home">Buy Second Hand Books Online In India</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-xs flex flex-col">

          <p>Copyright 2024-25 &copy; <span className="text-[#F44336]"><a href="https://bookish.in/">BooKish</a></span> All Rights Reserved</p>
          <p> Made By{" "} <span className="text-[#F44336] inline-flex"> <FaHeart /></span>{" "}
            Yasir.bytes
          </p>



        </div>
      </footer>





    </>
  );
};


export default FooterBackground