import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import image1 from "../../assets/Images/image.jpg";
import { FaLocationDot } from "react-icons/fa6";



const books = [
    {
        id: 1,
        title: "Diary of Wimpy Kids Set",
        category: "fiction",
        price: "200$",
        location: "Kolkata, West Bengal",
        datePosted: "December 17, 2024",
        views: 17,
        imageUrl: image1,
    },
    {
        id: 2,
        title: "The Alchemist",
        category: "fiction",
        price: "150$",
        location: "Mumbai, Maharashtra",
        datePosted: "November 25, 2024",
        views: 45,
        imageUrl: image1,
    },
    {
        id: 3,
        title: "The Psychology of Money",
        category: "non-fiction",
        price: "300$",
        location: "Delhi, India",
        datePosted: "October 10, 2024",
        views: 58,
        imageUrl: image1,
    },
    {
        id: 4,
        title: "Atomic Habits",
        category: "non-fiction",
        price: "250$",
        location: "Bangalore, Karnataka",
        datePosted: "September 30, 2024",
        views: 92,
        imageUrl: image1,
    },
    {
        id: 5,
        title: "Rich Dad Poor Dad",
        category: "non-fiction",
        price: "180$",
        location: "Pune, Maharashtra",
        datePosted: "August 15, 2024",
        views: 73,
        imageUrl: image1,
    },
    {
        id: 6,
        title: "Sherlock Holmes Collection",
        category: "fiction",
        price: "220$",
        location: "Hyderabad, Telangana",
        datePosted: "July 20, 2024",
        views: 88,
        imageUrl:image1,
    },
    {
        id: 7,
        title: "To Kill a Mockingbird",
        category: "fiction",
        price: "175$",
        location: "Chennai, Tamil Nadu",
        datePosted: "June 5, 2024",
        views: 41,
        imageUrl: image1,
    },
    {
        id: 8,
        title: "The Power of Your Subconscious Mind",
        category: "non-fiction",
        price: "260$",
        location: "Jaipur, Rajasthan",
        datePosted: "May 18, 2024",
        views: 35,
        imageUrl: image1,
    },
    {
        id: 9,
        title: "The Subtle Art of Not Giving a F*ck",
        category: "non-fiction",
        price: "270$",
        location: "Ahmedabad, Gujarat",
        datePosted: "April 12, 2024",
        views: 60,
        imageUrl: image1,
    },
    {
        id: 10,
        title: "Harry Potter Series",
        category: "fiction",
        price: "500$",
        location: "Lucknow, Uttar Pradesh",
        datePosted: "March 8, 2024",
        views: 101,
        imageUrl: image1,
    },
    {
        id: 11,
        title: "The Catcher in the Rye",
        category: "fiction",
        price: "190$",
        location: "Bhopal, Madhya Pradesh",
        datePosted: "February 22, 2024",
        views: 38,
        imageUrl: image1,
    },
    {
        id: 12,
        title: "Think and Grow Rich",
        category: "non-fiction",
        price: "240$",
        location: "Patna, Bihar",
        datePosted: "January 10, 2024",
        views: 52,
        imageUrl: image1,
    },
    {
        id: 13,
        title: "The Great Gatsby",
        category: "fiction",
        price: "180$",
        location: "Indore, Madhya Pradesh",
        datePosted: "December 2, 2024",
        views: 25,
        imageUrl: image1,
    },
    {
        id: 14,
        title: "The Lean Startup",
        category: "non-fiction",
        price: "290$",
        location: "Nagpur, Maharashtra",
        datePosted: "November 5, 2024",
        views: 65,
        imageUrl:image1,
    },
    {
        id: 15,
        title: "1984",
        category: "fiction",
        price: "210$",
        location: "Kochi, Kerala",
        datePosted: "October 28, 2024",
        views: 49,
        imageUrl: image1,
    },
    {
        id: 16,
        title: "Zero to One",
        category: "non-fiction",
        price: "320$",
        location: "Surat, Gujarat",
        datePosted: "September 12, 2024",
        views: 80,
        imageUrl: image1,
    }
];



function BuyNovelsBooks() {
    const [selectedCategory, setSelectedCategory] = useState("fiction");

    const filteredBooks = books.filter(book => book.category === selectedCategory);




     const [likedBooks, setLikedBooks] = useState([]);
    
        const handleLike = (bookId) => {
            if (likedBooks.includes(bookId)) {
                setLikedBooks(likedBooks.filter((id) => id !== bookId)); // Unlike
            } else {
                setLikedBooks([...likedBooks, bookId]); // Like
            }
        };


    return (
        <div className="container bg-[#f0f0f0] py-10 relative " style={{
            background: `rgba(240, 240, 240, 1)  center center / cover no-repeat`,
            minHeight: '650px', // Increase height here
        }}>
            <div className="w-9/12 mx-auto py-6">
                <h2 className="text-2xl antialiased text-left my-6 flex flex-col">
                    Buy Second Hand Novels
                    <span className="w-[270px] h-[4px]  overflow-hidden bg-[#b62323] mt-2 rounded-sm"></span>
                </h2>

                <div className="flex justify-start gap-2 mb-[40px]">
                    <button
                        className="px-6 py-3 text-lg font-light transition duration-300"
                        onClick={() => setSelectedCategory("fiction")}
                        style={{
                            backgroundColor: selectedCategory === "fiction" ? "#E74C3C" : "#f0f0f0",
                            color: selectedCategory === "fiction" ? "white" : "black",
                        }}
                    >
                        FICTION
                    </button>
                    <button
                        className="px-6 py-3 text-lg font-light  transition duration-300 "
                        onClick={() => setSelectedCategory("non-fiction")}
                        style={{
                            backgroundColor: selectedCategory === "non-fiction" ? "#E74C3C" : "#f0f0f0",
                            color: selectedCategory === "non-fiction" ? "white" : "black",
                        }}
                    >
                        NON-FICTION
                    </button>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBooks.map(book => (
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
                                {/* <span
                                    className="badge absolute top-[45px] right-[-20px] bg-[#ff2121] text-white text-xs px-6 py-1 transform origin-top-right"
                                    style={{
                                        transform: "rotate(45deg)",
                                    }}
                                >
                                    Featured
                                </span> */}
                                <button
                                    className="absolute bottom-2 right-2 text-xl focus:outline-none hover:text-white "
                                    onClick={() => handleLike(book.id)}
                                >
                                    <FaHeart
                                        className={`transition-colors duration-300 ${likedBooks.includes(book.id) ? "text-[#ff2424]" : "text-[#f0f0f0]"
                                            }`}
                                    />
                                </button>
                            </div>


                            <div className="mt-4 px-2 flex flex-col gap-1 pb-1">
                                <h3 className="text-lg font-light antialiased">
                                    {book.title.length > 20 ? `${book.title.slice(0, 30)}...` : book.title}
                                </h3>
                                <p className="text-[#E74C3C] font-semibold antialiased">{book.price}</p>
                               
                                <p className="text-sm flex text-[#777777]"><FaLocationDot className='text-[#ff2424]' />
                                {book.location}</p>
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
    )
}

export default BuyNovelsBooks