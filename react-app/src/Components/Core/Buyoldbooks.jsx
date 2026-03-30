import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../services/operations/postAPI";
import HomeWideCard from "./HomeWideCard";

const Buyoldbooks = () => {
    const [ads, setAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAds = async () => {
            const result = await dispatch(getAllPosts({ limit: 6, sort: "recent" }));
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
                    <HomeWideCard key={book._id} book={book} />
                ))}


            </div>

        </div>
    )
}

export default Buyoldbooks
