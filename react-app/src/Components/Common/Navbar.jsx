import React from 'react'
import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"
import logo from "../../assets/logo/Bookish-logo1.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import SellButton from '../Core/SellButton'
// import { categories } from "../../services/apis"
// import { ACCOUNT_TYPE } from "../../utils/constants"
// import ProfileDropdown from "../core/Auth/ProfileDropdown"
// import SideBar from "../core/HomePage/SideBar"

const Navbar = () => {






    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    // const { totalItems } = useSelector((state) => state.cart)

    const location = useLocation()

    const [loading, setLoading] = useState(false)

    //   useEffect(() => {
    //     ; (async () => {
    //       setLoading(true)
    //       try {
    //         const res = await apiConnector("GET", categories.CATEGORIES_API)
    //         setSubLinks(res.data.data)
    //       } catch (error) {
    //         console.log("Could not fetch Categories.", error)
    //       }
    //       setLoading(false)
    //     })()
    //   }, [])

    // console.log("sub links", subLinks)

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!open);


    return (
        <div
            className={`flex h-15 items-center justify-center border-b-[1px] border-b-white ${location.pathname !== "/" ? "bg-white" : ""
                } transition-all duration-200`}
        >
            <div className="flex w-[100%] pl-4 items-center justify-between">
                {/* Logo */}
                <Link to="/">
                    <img src={logo} alt="Logo" width={190} height={40} loading="lazy" />
                </Link>
                {/* Navigation links */}
                <nav className="hidden md:block">
                    <ul className="flex gap-x-6 text-black">
                        {NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {link.title === "Catalog" ? (
                                    <>
                                        <div
                                            className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                                                ? "text-yellow-25"
                                                : "text-richblack-25"
                                                }`}
                                        >
                                            <p>{link.title}</p>
                                            <BsChevronDown />
                                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                {/* {loading ? (
                                                    <p className="text-center">Loading...</p>
                                                ) : subLinks.length ? (
                                                    <>
                                                        {subLinks
                                                            ?.filter(
                                                                (subLink) => subLink?.courses?.length > 0
                                                            )
                                                            ?.map((subLink, i) => (
                                                                <Link
                                                                    to={`/catalog/${subLink.name
                                                                        .split(" ")
                                                                        .join("-")
                                                                        .toLowerCase()}`}
                                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                    key={i}
                                                                >
                                                                    <p>{subLink.name}</p>
                                                                </Link>
                                                            ))}
                                                    </>
                                                ) : (
                                                    <p className="text-center">No Courses Found</p>
                                                )} */}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link to={link?.path}>
                                        <p
                                            className={`${matchRoute(link?.path)
                                                ? "text-[#E74C3C] "
                                                : "text-black"
                                                }`}
                                        >
                                            {link.title}
                                        </p>
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
                    {/* {token !== null && <ProfileDropdown />} */}
                    <SellButton/>
                </div>

                {/* Mobile dropdown */}
                <button className="mr-4 md:hidden" onClick={() => setOpen(!open)}>
                    {open ? <AiOutlineClose fontSize={24} fill="#AFB2BF" /> : <AiOutlineMenu fontSize={24} fill="#AFB2BF" />}
                    {/* {open ? (
                <AiOutlineClose fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
              )} */}

                </button>




            </div>

            {open && (
                <div className="absolute top-14 left-0 right-0 z-40 bg-richblack-800 p-4 md:hidden ">
                    <button className="absolute top-4 right-8 z-50" onClick={toggleOpen}>

                    </button>
                    {/* <SideBar
                        NavbarLinks={NavbarLinks}
                        matchRoute={matchRoute}
                        loading={loading}
                        subLinks={subLinks}
                        toggleOpen={toggleOpen}
                    /> */}
                </div>
            )}
            {/* <SideBar open={open} toggleOpen={toggleOpen} NavbarLinks={NavbarLinks} matchRoute={matchRoute} /> */}

        </div>
    )









}

export default Navbar
