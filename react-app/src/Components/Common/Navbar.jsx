import React from 'react'
import { useState } from "react"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"
import logo from "../../assets/logo/Bookish-logo1.png"
import { CompetitiveDropdown, serviceDropdown, novelDropdown } from "../../data/navbar-links"
import SellButton from '../Core/SellButton'
import { FaChevronDown } from "react-icons/fa";



const Navbar = () => {

  // Main navigation links
  const NavbarLinks = [
    { title: "Home", path: "/" },
    { title: "Used Books On Sale", submenu: serviceDropdown },
    { title: "Competitive Exam Books", submenu: CompetitiveDropdown },
    { title: "Novels", submenu: novelDropdown },
    { title: "Book Reviews", path: "/bookreviews" },
  ];




  const { token } = useSelector((state) => state.auth)

  const location = useLocation()




  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const [openDropdown, setOpenDropdown] = useState(null);


  return (
    <div
      className={`flex h-15 items-center justify-center border-b-[1px] border-b-white ${location.pathname !== "/" ? "bg-white" : ""
        } transition-all duration-200`}
    >
      <div className="flex w-[100%]  pl-1 md:pl-4 items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={190} height={40} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-black">
            {NavbarLinks.map((link, index) => (
              <li
                key={index}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(index)} // Open dropdown on hover
                onMouseLeave={() => setOpenDropdown(null)} // Close dropdown when mouse leaves
              >
                {/* Dropdown for links with submenu */}
                {link.submenu ? (
                  <div className="flex cursor-pointer items-center gap-1 text-black">
                    <p>{link.title}</p>
                    <FaChevronDown />

                    {/* Dropdown Menu */}
                    {openDropdown === index && (
                      <div className="absolute left-0 top-full z-50 pt-2 w-[250px] flex flex-col rounded-lg bg-white text-black shadow-lg">
                        {link.submenu.map((sublink, subIndex) => (
                          <Link
                            key={subIndex}
                            to={sublink.path}
                            className="py-4 pl-3 block transition-all duration-400 ease-in-out text-sm hover:bg-[#b52417] hover:text-white"
                            onClick={() => setOpenDropdown(null)} // Close dropdown when clicking an item
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Normal links
                  <Link
                    to={link.path}
                    className={` ${matchRoute(link?.path) ? "text-[#E74C3C]" : "text-black"}`}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden md:flex items-center gap-x-4 ">
          {!token && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-transparent px-[12px] py-[8px] text-richblack-900 hover:bg-[#b52417] duration-[75] hover:text-white">
                LogIn
              </button>
            </Link>
          )}
          {!token && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-transparent px-[12px] py-[8px] text-richblack-900 hover:bg-[#b52417] duration-[75] hover:text-white">
                Register
              </button>
            </Link>
          )}
          <SellButton />
        </div>

        {/* Mobile dropdown */}
        <button
          className="md:hidden w-12 h-12 bg-black flex items-center justify-center m-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <AiOutlineClose fontSize={30} fill="#fafafc" /> : <AiOutlineMenu fontSize={24} fill="#fafafc" />}
        </button>




      </div>

      {open && (
        <div className="mobileDropdown absolute top-16 h-full left-0 right-0 z-40 bg-white p-4 md:hidden">
          <ul className="flex flex-col gap-y-4 text-black ">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.submenu ? (
                  <div className="flex flex-col ">
                    <button
                      className="flex justify-between items-center w-full text-left"
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    >
                      {link.title}
                      <FaChevronDown className={`transition-transform ${openDropdown === index ? "rotate-180" : ""}`} />
                    </button>
                    {openDropdown === index && (
                      <div className="pl-4 mt-2 flex flex-col text-sm">
                        {link.submenu.map((sublink, subIndex) => (
                          <Link
                            key={subIndex}
                            to={sublink.path}
                            className="py-2 text-gray-700 hover:text-[#b52417]"
                            onClick={() => setOpen(false)}
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`block py-2 ${matchRoute(link?.path) ? "text-[#E74C3C]" : "text-black"}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}

            {/* Mobile Auth Buttons */}
            {!token && (
              <Link to="/login">
                <button className="w-full rounded-[8px] border border-gray-700 bg-transparent px-[12px] py-[8px] text-gray-900 hover:bg-[#b52417] hover:text-white"
                  onClick={() => setOpen(false)}>
                  Log in
                </button>
              </Link>
            )}
            {!token && (
              <Link to="/signup">
                <button className="w-full rounded-[8px] border border-gray-700 bg-transparent px-[12px] py-[8px] text-gray-900 hover:bg-[#b52417] hover:text-white"
                  onClick={() => setOpen(false)}>
                  Register
                </button>
              </Link>
            )}

            <SellButton onClick={() => setOpen(false)} />
          </ul>
        </div>
      )}
    </div>
  )









}

export default Navbar



// import React, { useState } from "react";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { useSelector } from "react-redux";
// import { Link, matchPath, useLocation } from "react-router-dom";
// import logo from "../../assets/logo/Bookish-logo1.png";
// import { CompetitiveDropdown, serviceDropdown, novelDropdown } from "../../data/navbar-links";
// import SellButton from "../Core/SellButton";
// import { FaChevronDown } from "react-icons/fa";

// const Navbar = () => {
//   const NavbarLinks = [
//     { title: "Home", path: "/" },
//     { title: "Used Books On Sale", submenu: serviceDropdown },
//     { title: "Competitive Exam Books", submenu: CompetitiveDropdown },
//     { title: "Novels", submenu: novelDropdown },
//     { title: "Book Reviews", path: "/bookreviews" },
//   ];

//   const { token } = useSelector((state) => state.auth);
//   const location = useLocation();

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname);
//   };

//   const [open, setOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);

//   return (
//     <div
//       className={`flex h-15 items-center justify-center border-b-[1px] border-b-white ${
//         location.pathname !== "/" ? "bg-white" : ""
//       } transition-all duration-200`}
//     >
//       <div className="flex w-full px-4 md:px-8 items-center justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <img src={logo} alt="Logo" width={190} height={40} loading="lazy" />
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:block">
//           <ul className="flex gap-x-6 text-black">
//             {NavbarLinks.map((link, index) => (
//               <li
//                 key={index}
//                 className="relative group"
//                 onMouseEnter={() => setOpenDropdown(index)}
//                 onMouseLeave={() => setOpenDropdown(null)}
//               >
//                 {link.submenu ? (
//                   <div className="flex cursor-pointer items-center gap-1 text-black">
//                     <p>{link.title}</p>
//                     <FaChevronDown />
//                     {openDropdown === index && (
//                       <div className="absolute left-0 top-full z-50 pt-2 w-[250px] flex flex-col rounded-lg bg-white text-black shadow-lg">
//                         {link.submenu.map((sublink, subIndex) => (
//                           <Link
//                             key={subIndex}
//                             to={sublink.path}
//                             className="py-4 pl-3 block transition-all duration-400 ease-in-out text-sm hover:bg-[#b52417] hover:text-white"
//                             onClick={() => setOpenDropdown(null)}
//                           >
//                             {sublink.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     to={link.path}
//                     className={`${matchRoute(link?.path) ? "text-[#E74C3C]" : "text-black"}`}
//                   >
//                     {link.title}
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Desktop Auth & Sell Button */}
//         <div className="hidden md:flex items-center gap-x-4">
//           {!token && (
//             <Link to="/login">
//               <button className="rounded-[8px] border border-richblack-700 bg-transparent px-[12px] py-[8px] text-richblack-900 hover:bg-[#b52417] duration-[75] hover:text-white">
//                 Log in
//               </button>
//             </Link>
//           )}
//           {!token && (
//             <Link to="/signup">
//               <button className="rounded-[8px] border border-richblack-700 bg-transparent px-[12px] py-[8px] text-richblack-900 hover:bg-[#b52417] duration-[75] hover:text-white">
//                 Register
//               </button>
//             </Link>
//           )}
//           <SellButton />
//         </div>

//         {/* Mobile Menu Toggle Button */}
//         <button className="md:hidden" onClick={() => setOpen(!open)}>
//           {open ? <AiOutlineClose fontSize={24} fill="#AFB2BF" /> : <AiOutlineMenu fontSize={24} fill="#AFB2BF" />}
//         </button>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {open && (
//         <div className="absolute top-14 left-0 right-0 z-40 bg-white p-4 md:hidden">
//           <ul className="flex flex-col gap-y-4 text-black">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.submenu ? (
//                   <div className="flex flex-col">
//                     <button
//                       className="flex justify-between items-center w-full text-left"
//                       onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
//                     >
//                       {link.title}
//                       <FaChevronDown className={`transition-transform ${openDropdown === index ? "rotate-180" : ""}`} />
//                     </button>
//                     {openDropdown === index && (
//                       <div className="pl-4 mt-2 flex flex-col text-sm">
//                         {link.submenu.map((sublink, subIndex) => (
//                           <Link
//                             key={subIndex}
//                             to={sublink.path}
//                             className="py-2 text-gray-700 hover:text-[#b52417]"
//                             onClick={() => setOpen(false)}
//                           >
//                             {sublink.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     to={link.path}
//                     className={`block py-2 ${matchRoute(link?.path) ? "text-[#E74C3C]" : "text-black"}`}
//                     onClick={() => setOpen(false)}
//                   >
//                     {link.title}
//                   </Link>
//                 )}
//               </li>
//             ))}

//             {/* Mobile Auth Buttons */}
//             {!token && (
//               <Link to="/login">
//                 <button className="w-full rounded-[8px] border border-gray-700 bg-transparent px-[12px] py-[8px] text-gray-900 hover:bg-[#b52417] hover:text-white">
//                   Log in
//                 </button>
//               </Link>
//             )}
//             {!token && (
//               <Link to="/signup">
//                 <button className="w-full rounded-[8px] border border-gray-700 bg-transparent px-[12px] py-[8px] text-gray-900 hover:bg-[#b52417] hover:text-white">
//                   Register
//                 </button>
//               </Link>
//             )}
//             <SellButton />
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

