import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot, FaStopwatch, FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export default function HomeWideCard({ book }) {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [isFavorite, setIsFavorite] = useState(user?.favorites?.includes(book?._id) || false);

    const handleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!token) {
            toast.error("Please login to add favorites");
            return;
        }
        setIsFavorite(!isFavorite); 
    };

    return (
        <Link 
            to={`/posts?category=${encodeURIComponent(book?.Category || "")}&subCategory=${encodeURIComponent(book?.subCategory || "")}&id=${book?._id}`}
            className='w-full md:h-[250px] mt-10 outline outline-[1px] flex flex-col md:flex-row bg-white hover:shadow-lg transition-shadow cursor-pointer'
        >
            <div className='w-full md:w-[400px] h-[250px]'> 
                <img src={book?.Images?.[0] || "/placeholder.svg"} alt={`${book?.Title} cover`} className='h-full w-full object-cover' />
            </div>
            
            <div className='md:pl-[40px] md:pr-[10px] md:mt-[20px] p-4 relative flex-1'>  
                <button 
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 z-10" 
                    onClick={handleLike}
                >
                    <FaHeart className={`text-3xl transition-colors duration-300 ${isFavorite ? "text-[#ff2424]" : "text-[#ccc]"}`} />
                </button>
                <div className="justify-start text-[#777777] text-xs pt-4 space-y-3">
                    <div className='flex flex-wrap gap-4'>
                        <p>{book?.Category} </p>
                        <p className='ml-[15px]'>{book?.subCategory}</p>
                    </div>
                    <h3 className="text-lg font-light antialiased text-black">
                        {book?.Title}
                    </h3>
                    <div className='flex flex-row '>
                        <div className='flex flex-row'>
                            <FaLocationDot className='text-sm text-[#777777]' />
                            <p className="text-sm text-[#777777] pl-[5px]">{book?.City}</p>
                        </div>
                        <div className='flex flex-row ml-[10px]'>
                            <FaStopwatch className='text-sm text-[#777777]' />
                            <p className=" pl-[5px] text-sm text-[#777777]">
                                {book?.postedAt ? new Date(book.postedAt).toLocaleDateString() : ""}
                            </p>
                        </div>
                    </div>
                    <h3 className="text-[15px] font-light antialiased text-[#777777]">
                        {book?.Description?.length > 100 ? `${book?.Description.slice(0, 100)}...` : book?.Description}
                    </h3>
                </div>
            </div>
            
            <div className="hidden md:block h-[190px] w-[1px] bg-black my-auto "></div>

            <div className="mt-4 md:mt-[40px] ml-4 md:ml-10 w-full md:w-[400px]">
                <div className='flex flex-row'><p className="text-sm font-bold text-gray-500">Ad Type:</p> <p className='text-sm pl-1 text-[#777777]'>{book?.adType}</p></div>
                <div className='flex flex-row'><p className="text-sm font-bold text-gray-500">Condition: </p> <p className='text-sm pl-1 text-[#777777]'>{book?.Condition}</p></div>
                <div className='flex flex-row'><p className="text-sm font-bold text-gray-500">Visits: </p> <p className='text-sm pl-1 text-[#777777]'>{book?.visits || 0}</p></div>
                <p className="text-xl font-bold text-[#FF0000] ">₹ {book?.Price}</p>
                <p className="text-sm font-bold text-gray-500 text-[#777777]">({book?.PriceType}) </p>

                <button className="bg-[#FF0000] w-[200px] text-white px-4 py-2 ml-[62px] md:ml-0 mt-4 mb-5 flex items-center font-bold justify-center rounded pointer-events-none">
                    <FaRegEye className="mr-2" /> VIEW AD
                </button>
            </div>
        </Link>
    );
}
