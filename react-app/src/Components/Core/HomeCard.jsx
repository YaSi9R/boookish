import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export default function HomeCard({ book, isFeatured, isSlider }) {
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

    const baseClasses = "card flex flex-col justify-between shadow hover:shadow-md cursor-pointer bg-white transition-all";
    const sliderClasses = "w-full flex-shrink-0 snap-start rounded-lg md:w-[250px]";
    const boxStyle = isSlider 
        ? "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px"
        : "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px";

    return (
        <Link 
            to={`/posts?category=${encodeURIComponent(book?.Category || "")}&subCategory=${encodeURIComponent(book?.subCategory || "")}&id=${book?._id}`}
            className={`${baseClasses} ${isSlider ? sliderClasses : ""}`}
            style={{ boxShadow: boxStyle }}
        >
            <div className="relative overflow-hidden">
                <img
                    src={book?.Images?.[0] || "/placeholder.svg"}
                    alt={`${book?.Title} cover`}
                    className={`w-full object-cover ${isSlider ? "h-60 md:h-40" : "h-40"}`}
                />
                
                {isFeatured && (
                    <span
                        className="badge absolute top-[45px] right-[-20px] bg-[#ff2121] text-white text-xs px-6 py-1 transform origin-top-right"
                        style={{ transform: "rotate(45deg)" }}
                    >
                        Featured
                    </span>
                )}
                
                <button
                    className="absolute bottom-2 right-2 text-xl focus:outline-none hover:text-white"
                    onClick={handleLike}
                >
                    <FaHeart className={`transition-colors duration-300 ${isFavorite ? "text-[#ff2424]" : "text-[#f0f0f0]"}`} />
                </button>
            </div>

            <div className="mt-4 px-2 flex flex-col gap-1 pb-1">
                <p className="text-[#777777] text-xs">{book?.Category}</p>
                <h3 className="text-lg font-light antialiased">
                    {book?.Title?.length > 20 ? `${book.Title.slice(0, 30)}...` : book?.Title}
                </h3>
                <p className="text-[#E74C3C] font-semibold antialiased">₹{book?.Price}</p>
                
                {!isSlider && <p className="text-sm text-[#777777]">{book?.City}</p>}
            </div>

            {!isSlider && (
                <div className="bg-white px-2 py-2 mt-4">
                    <p className="text-xs text-[#777777]">
                        {new Date(book?.postedAt).toLocaleDateString()} | {book?.visits || 0} Views
                    </p>
                </div>
            )}
        </Link>
    );
}
