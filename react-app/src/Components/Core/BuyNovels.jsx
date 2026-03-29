import React, { useState, useEffect } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../services/operations/postAPI";

function BuyNovelsBooks() {
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Fiction");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchStories = async () => {
            const result = await dispatch(getAllPosts({ category: "Stories", limit: 16 }));
            if (result) {
                setBooks(result);
            }
        };
        fetchStories();
    }, [dispatch]);

    const filteredBooks = books.filter(book => book.subCategory === selectedCategory);




     const [likedBooks, setLikedBooks] = useState([]);
    
        const handleLike = (bookId) => {
            if (likedBooks.includes(bookId)) {
                setLikedBooks(likedBooks.filter((id) => id !== bookId)); // Unlike
            } else {
                setLikedBooks([...likedBooks, bookId]); // Like
            }
        };


    return (
        <div className="container bg-[#f0f0f0] py-10 relative min-h-[650px]" style={{
            background: `rgba(240, 240, 240, 1)  center center / cover no-repeat`,
            minHeight: '650px', // Increase height here
        }}>
            <div className="w-11/12 sm:w-10/12 md:w-10/12 md:w-9/12 mx-auto py-6">
                <h2 className="text-2xl antialiased text-left my-6 ">
                    Buy Second Hand Novels
                    <span className="block w-2/3 sm:w-[270px] h-[4px] bg-[#b62323] mt-2 rounded-sm"></span>
                </h2>

                <div className="flex flex-wrap justify-start gap-2 mb-8">
                    {['Fiction', 'Non-Fiction'].map(category => (
                        <button
                            key={category}
                            className={`px-6 py-3 text-lg font-light transition duration-300 ${
                                selectedCategory === category ? 'bg-[#E74C3C] text-white' : 'bg-[#f0f0f0] text-black'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category.toUpperCase()}
                        </button>
                    ))}
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBooks.map(book => (
                        <div
                            key={book._id}
                            className=" justify-between shadow hover:shadow-md cursor-pointer"
                            style={{
                                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                            }}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={book.Images?.[0] || "/placeholder.svg"}
                                    alt={`${book.Title} cover`}
                                    className="w-full h-40 object-cover"
                                />
                                <button
                                    className="absolute bottom-2 right-2 text-xl focus:outline-none hover:text-white "
                                    onClick={() => handleLike(book._id)}
                                >
                                    <FaHeart
                                        className={`transition-colors duration-300 ${likedBooks.includes(book._id) ? "text-[#ff2424]" : "text-[#f0f0f0]"
                                            }`}
                                    />
                                </button>
                            </div>


                            <div className="mt-4 px-2 flex flex-col gap-1 pb-1">
                                <h3 className="text-lg font-light antialiased">
                                    {book.Title?.length > 20 ? `${book.Title.slice(0, 30)}...` : book.Title}
                                </h3>
                                <p className="text-[#E74C3C] font-semibold antialiased">₹{book.Price}</p>
                               
                                <p className="text-sm flex text-[#777777]"><FaLocationDot className='text-[#ff2424]' />
                                {book.City}</p>
                            </div>


                            {/* Separate div for datePosted */}
                            <div className="bg-white px-2 py-2 mt-4">
                                <p className="text-xs text-[#777777]">
                                    {new Date(book.postedAt).toLocaleDateString()} | {book.views || 0} Views
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


