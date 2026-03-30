import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../services/operations/postAPI";
import HomeCard from "./HomeCard";

function FeaturedBooks() {
    const [books, setBooks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFeatured = async () => {
            const result = await dispatch(getAllPosts({ limit: 4, sort: "visits" }));
            if (result && result.length > 0) {
                setBooks(result);
            }
        };
        fetchFeatured();
    }, [dispatch]);

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
                        <HomeCard key={book._id} book={book} isFeatured={true} />
                    ))}
                </div>
            </div>
        </div>

    );
}

export default FeaturedBooks;
