import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../services/operations/postAPI";
import HomeCard from "./HomeCard";

function BuyNovelsBooks() {
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Fiction");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchStories = async () => {
            const result = await dispatch(getAllPosts({ category: "Novels", limit: 16, sort: "likes" }));
            if (result) {
                setBooks(result);
            }
        };
        fetchStories();
    }, [dispatch]);

    const filteredBooks = books.filter(book => book.subCategory === selectedCategory);
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


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                    {filteredBooks.map(book => (
                        <HomeCard key={book._id} book={book} />
                    ))}
                </div>


            </div>



        </div>
    )
}

export default BuyNovelsBooks


