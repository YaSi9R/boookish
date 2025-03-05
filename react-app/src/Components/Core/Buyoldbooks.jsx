import React, { useState } from 'react'
import image1 from '../../assets/Images/image.jpg';
import { FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaStopwatch } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";





const Buyoldbooks = () => {
    const ads = [
        {
            id: '1',
            image: image1,
            category: 'Competitive Exam',
            subCategory:'Engineering Books',
            title:'Jee Mains Previous Year Solved Paper',
            location:'Bangalore,   Karnataka',
            time:' August 20, 2024',
            desc:'11 years solved jee mains previous year exam papers , from 2012 to 2024 with all solved questions and back papers with detailed explaination',
            price: '₹ 500',



            
        },
        {
            id: '2',
            image: image1,
            category: 'Competitive Exam',
            subCategory:'Engineering Books',
            title:'Jee Mains Previous Year Solved Paper',
            location:'Bangalore,   Karnataka',
            time:' August 20, 2024',
            desc:'11 years solved jee mains previous year exam papers , from 2012 to 2024 with all solved questions and back papers with detailed explaination',
            price: '₹ 500',



            
        },
        {
            id: '3',
            image: image1,
            category: 'Competitive Exam',
            subCategory:'Engineering Books',
            title:'Jee Mains Previous Year Solved Paper',
            location:'Bangalore,   Karnataka',
            time:' August 20, 2024',
            desc:'11 years solved jee mains previous year exam papers , from 2012 to 2024 with all solved questions and back papers with detailed explaination',
            price: '₹ 500',



            
        },
        {
            id: '4',
            image: image1,
            category: 'Competitive Exam',
            subCategory:'Engineering Books',
            title:'Jee Mains Previous Year Solved Paper',
            location:'Bangalore,   Karnataka',
            time:' August 20, 2024',
            desc:'11 years solved jee mains previous year exam papers , from 2012 to 2024 with all solved questions and back papers with detailed explaination',
            price: '₹ 500',



            
        },
        {
            id: '5',
            image: image1,
            category: 'Competitive Exam',
            subCategory:'Engineering Books',
            title:'Jee Mains Previous Year Solved Paper',
            location:'Bangalore,   Karnataka',
            time:' August 20, 2024',
            desc:'11 years solved jee mains previous year exam papers , from 2012 to 2024 with all solved questions and back papers with detailed explaination',
            price: '₹ 500',



            
        },
        {
            id: '6',
            image: image1,
            category: 'Competitive Exam',
            subCategory:'Engineering Books',
            title:'Jee Mains Previous Year Solved Paper',
            location:'Bangalore,   Karnataka',
            time:' August 20, 2024',
            desc:'11 years solved jee mains previous year exam papers , from 2012 to 2024 with all solved questions and back papers with detailed explaination',
            price: '₹ 500',



            
        },

    ]
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


                {ads.map((book) => (
                <div className='w-full md:h-[250px] mt-10 outline outline-[1px] flex flex-col md:flex-row'>

                    <div className='w-full md:w-[400px] h-[250px]'> <img src={book.image} alt="ads-image" className='h-full w-full object-cover ' /></div>
                    <div className='md:pl-[40px] md:pr-[10px] md:mt-[20px] p-4  relative'>  
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 " onClick={() => handleLike(book.id)}>
                            {/* <FaHeart
                                className={`transition-colors duration-300
                                     ${likedBooks.includes(book.id) ? 
                                        "text-[#ff2424]" : "text-[#f0f0f0]"
                                    }
                                    
                                    `}
                            /> */}

                            <FaHeart className={`text-3xl transition-colors duration-300 ${likedBooks.includes(book.id) ? "text-[#ff2424]" : "text-[#ccc]"}`} />
                        </button>
                        <div className=" justify-start text-[#777777] text-xs  pt-4 space-y-3">
                            <div className='flex flex-wrap gap-4 '>
                                <p>Competitive exam </p>
                                <p className='ml-[15px]'>Engineering Exams</p>
                            </div>
                            <h3 className="text-lg font-light antialiased text-black">
                                Jee Mains Previous Year Solved Paper
                            </h3>
                            <div className='flex flex-row '>
                                <div className='flex flex-row'>
                                    <FaLocationDot className='text-sm text-[#777777]' />
                                    <p className="text-sm text-[#777777] pl-[5px]">
                                        Bangalore,   Karnataka</p>
                                </div>

                                <div className='flex flex-row ml-[10px]'>
                                    <FaStopwatch className='text-sm text-[#777777]' />
                                    <p className=" pl-[5px] text-sm text-[#777777]">
                                        August 20, 2024
                                    </p>

                                </div>

                            </div>

                            <h3 className="text-[15px] font-light antialiased text-[#777777]">
                                11 years solved jee mains previous year exam papers , from 2012 to 2024 with all solved questions and back papers with detailed explaination



                                {/* {book.title.length > 20
                    ? `${book.title.slice(0, 30)}...`
                    : book.title }  */}

                            </h3>




                        </div>



                    </div>
                    
                    <div className="hidden md:block h-[190px] w-[1px] bg-black my-auto "></div>

                    < div className="mt-4 md:mt-[40px] ml-4 md:ml-10 w-full md:w-[400px] ">
                        <div className='flex flex-row'><p className="text-sm font-bold text-gray-500">Ad Type:</p> <p className='text-sm pl-1 text-[#777777]'> Sell</p>   </div>
                        <div className='flex flex-row'><p className="text-sm font-bold text-gray-500">Condition: </p>  <p className='text-sm pl-1 text-[#777777]'>New</p></div>
                        <div className='flex flex-row'><p className="text-sm font-bold text-gray-500">Visits: </p>  <p className='text-sm pl-1 text-[#777777]'>65</p></div>
                        <p className="text-xl font-bold text-[#FF0000] ">₹ 500</p>
                        <p className="text-sm font-bold text-gray-500 text-[#777777]">(Negotiable) </p>

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
