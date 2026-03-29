import React, { useState, useEffect } from 'react'
import { FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaStopwatch } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../services/operations/postAPI";

const Buyoldbooks = () => {
    const [ads, setAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAds = async () => {
            const result = await dispatch(getAllPosts({ limit: 6 }));
            if (result && result.length > 0) {
                setAds(result);
                if (window.innerWidth < 768) {
                    setFilteredAds(result.slice(0, 4));
                } else {
                    setFilteredAds(result);
                }
            }
        };
        fetchAds();
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setFilteredAds(ads.slice(0, 4));
            } else {
                setFilteredAds(ads);
            }
        };

        handleResize(); // Run on initial load
        window.addEventListener("resize", handleResize); // Listen for window resize

        return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
    }, [ads]);

    const handleLike = (bookId) => {
        if (likedBooks.includes(bookId)) {
            setLikedBooks(likedBooks.filter((id) => id !== bookId)); // Unlike
        } else {
            setLikedBooks([...likedBooks, bookId]); // Like
        }
    };
    return (
        <div className="container bg-[#f0f0f0] py-10 relative " style={{
            background: `white  center center / cover no-repeat`,
            minHeight: '650px', // Increase height here
        }
        }
        >

            <div className='w-11/12 md:w-9/12 mx-auto py-6'>
                <h2 className="text-2xl antialiased text-left my-6 flex flex-col">
                    Buy Old Books
                    <span className="w-[170px] h-[4px] my-10 bg-[#b62323] mt-2 rounded-sm block"></span>
                </h2>


                {filteredAds.map((book) => (
                <div key={book._id} className='w-full md:h-[250px] mt-10 outline outline-[1px] flex flex-col md:flex-row'>

                    <div className='w-full md:w-[400px] h-[250px]'> <img src={book.Images?.[0] || "/placeholder.svg"} alt="ads-image" className='h-full w-full object-cover ' /></div>
                    <div className='md:pl-[40px] md:pr-[10px] md:mt-[20px] p-4  relative'>  
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 " onClick={() => handleLike(book._id)}>
                            <FaHeart className={`text-3xl transition-colors duration-300 ${likedBooks.includes(book._id) ? "text-[#ff2424]" : "text-[#ccc]"}`} />
                        </button>
                        <div className=" justify-start text-[#777777] text-xs  pt-4 space-y-3">
                            <div className='flex flex-wrap gap-4 '>
                                <p>{book.Category} </p>
                                <p className='ml-[15px]'>{book.subCategory}</p>
                            </div>
                            <h3 className="text-lg font-light antialiased text-black">
                                {book.Title}
                            </h3>
                            <div className='flex flex-row '>
                                <div className='flex flex-row'>
                                    <FaLocationDot className='text-sm text-[#777777]' />
                                    <p className="text-sm text-[#777777] pl-[5px]">
                                        {book.City}</p>
                                </div>

                                <div className='flex flex-row ml-[10px]'>
                                    <FaStopwatch className='text-sm text-[#777777]' />
                                    <p className=" pl-[5px] text-sm text-[#777777]">
                                        {new Date(book.postedAt).toLocaleDateString()}
                                    </p>

                                </div>

                            </div>

                            <h3 className="text-[15px] font-light antialiased text-[#777777]">
                                {book.Description?.length > 100 ? `${book.Description.slice(0, 100)}...` : book.Description}
                            </h3>

                        </div>

                    </div>
                    
                    <div className="hidden md:block h-[190px] w-[1px] bg-black my-auto "></div>

                    < div className="mt-4 md:mt-[40px] ml-4 md:ml-10 w-full md:w-[400px] ">
                        <div className='flex flex-row'><p className="text-sm font-bold text-gray-500">Ad Type:</p> <p className='text-sm pl-1 text-[#777777]'> {book.adType}</p>   </div>
                        <div className='flex flex-row'><p className="text-sm font-bold text-gray-500">Condition: </p>  <p className='text-sm pl-1 text-[#777777]'>{book.Condition}</p></div>
                        <div className='flex flex-row'><p className="text-sm font-bold text-gray-500">Visits: </p>  <p className='text-sm pl-1 text-[#777777]'>{book.views || 0}</p></div>
                        <p className="text-xl font-bold text-[#FF0000] ">₹ {book.Price}</p>
                        <p className="text-sm font-bold text-gray-500 text-[#777777]">({book.PriceType}) </p>

                        {/*  md:w-[200px] text-white px-4 py-2 mt-2 */}
                        <button className="bg-[#FF0000] w-[200px] text-white px-4 py-2 ml-[62px] md:ml-0 mt-4 mb-5 flex items-center font-bold justify-center rounded">
                            <FaRegEye />

                            VIEW AD
                        </button>
                    </div>

                    <div className='bg-black'></div>

                </div>
                ))}


            </div>

        </div>
    )
}

export default Buyoldbooks
