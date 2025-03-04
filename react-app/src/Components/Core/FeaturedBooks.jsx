import React, { useState } from "react";
import image1 from "../../assets/Images/image.jpg";
import { FaHeart } from "react-icons/fa";

function FeaturedBooks() {
    const books = [
        {
            id: 1,
            title: "Mathematics Class XI",
            category: "Computer/Information Technology",
            price: "Price On Call",
            location: "Kolkata, West Bengal",
            datePosted: "December 17, 2024",
            views: 17,
            imageUrl: image1,
        },
        {
            id: 2,
            title: "It Ends With Us (Collection)",
            category: "Fiction Stories",
            price: "₹2,000 (Negotiable)",
            location: "Faridabad, Haryana, India",
            datePosted: "December 17, 2024",
            views: 22,
            imageUrl: image1,
        },
        {
            id: 3,
            title: "Objective NCERT at Your Fingertips",
            category: "Medical Competitive Exam",
            price: "₹700 (Fixed)",
            location: "Gobichettipalayam, Erode",
            datePosted: "December 16, 2024",
            views: 12,
            imageUrl: image1,
        },
        {
            id: 4,
            title: "Wave and Thermodynamics",
            category: "Others Engineering",
            price: "Price On Call",
            location: "Lucknow",
            datePosted: "December 16, 2024",
            views: 17,
            imageUrl: image1,
        },
    ];

    const [likedBooks, setLikedBooks] = useState([]);

    const handleLike = (bookId) => {
        if (likedBooks.includes(bookId)) {
            setLikedBooks(likedBooks.filter((id) => id !== bookId)); // Unlike
        } else {
            setLikedBooks([...likedBooks, bookId]); // Like
        }
    };

    return (
        <div className="container bg-[#f0f0f0] py-10">
            <div className="w-10/12 md:w-9/12 mx-auto py-6">
                {/* Heading */}
                <h2 className="text-2xl antialiased text-left my-6 flex flex-col">
                    Featured Used Books
                    <span className="w-[232px] h-[4px] my-10 overflow-hidden bg-[#b62323] mt-2 rounded"></span>
                </h2>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="card flex flex-col justify-between shadow hover:shadow-md cursor-pointer"
                            style={{
                                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                            }}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={book.imageUrl}
                                    alt={`${book.title} cover`}
                                    className="w-full h-40 object-cover"
                                />
                                <span
                                    className="badge absolute top-[45px] right-[-20px] bg-[#ff2121] text-white text-xs px-6 py-1 transform origin-top-right"
                                    style={{
                                        transform: "rotate(45deg)",
                                    }}
                                >
                                    Featured
                                </span>
                                <button
                                    className="absolute bottom-2 right-2 text-xl focus:outline-none hover:text-white "
                                    onClick={() => handleLike(book.id)}
                                >
                                    <FaHeart
                                        className={`transition-colors duration-300 ${
                                            likedBooks.includes(book.id) ? "text-[#ff2424]" : "text-[#f0f0f0]"
                                        }`}
                                    />
                                </button>
                                </div>
                            

                            <div className="mt-4 px-2 flex flex-col gap-1 pb-1">
                                <p className="text-[#777777] text-xs">{book.category}</p>
                                <h3 className="text-lg font-light antialiased">
                                    {book.title.length > 20 ? `${book.title.slice(0, 30)}...` : book.title}
                                </h3>
                                <p className="text-[#E74C3C] font-semibold antialiased">{book.price}</p>
                                <p className="text-sm text-[#777777]">{book.location}</p>
                            </div>
                           

                            {/* Separate div for datePosted */}
                            <div className="bg-white px-2 py-2 mt-4">
                                <p className="text-xs text-[#777777]">
                                    {book.datePosted} | {book.views} Views
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default FeaturedBooks;
