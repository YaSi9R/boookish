import React from 'react'
import { useState } from "react"
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"
import logo from "../../assets/logo/Bookish-logo1.png"
import {CompetitiveDropdown,serviceDropdown ,novelDropdown} from "../../data/navbar-links"
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
                <div className="hidden items-center gap-x-4 md:flex">
                    {token === null && (
                        <Link to="/login">
                            <button className="rounded-[8px] border border-richblack-700 bg-transparent px-[12px] py-[8px] text-richblack-900 hover:bg-[#b52417] duration-[75]  hover:text-white">
                                Log in
                            </button>
                        </Link>
                    )}
                    {token === null && (
                        <Link to="/signup">
                            <button className="rounded-[8px] border border-richblack-700 bg-transparent px-[12px] py-[8px] text-richblack-900 hover:bg-[#b52417] duration-[75] hover:text-white">
                                Register
                            </button>
                        </Link>
                    )}
                    <SellButton />
                </div>

                {/* Mobile dropdown */}
                <button className="mr-4 md:hidden" onClick={() => setOpen(!open)}>
                    {open ? <AiOutlineClose fontSize={24} fill="#AFB2BF" /> : <AiOutlineMenu fontSize={24} fill="#AFB2BF" />}


                </button>




            </div>

            {open && (
                <div className="absolute top-14 left-0 right-0 z-40 bg-richblack-800 p-4 md:hidden ">
                    <button className="absolute top-4 right-8 z-50" onClick={toggleOpen}>

                    </button>

                </div>
            )}

        </div>
    )









}

export default Navbar
