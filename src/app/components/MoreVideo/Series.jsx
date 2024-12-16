"use client"
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import {useState,useRef,useEffect,useContext  } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { FavoriteContext } from "../../context/favoriteContext";

const UrlData = "http://localhost:8000/"
export default function Series() {
    const { addFavorite} = useContext(FavoriteContext);
    const scrollContainerRef = useRef(null);
    const [Videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const data = await fetch(`${UrlData}Videos`)
            const dataVideos = await data.json()
            setVideos(dataVideos)
            
        }
        fetchdata()
    }, [])
    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = 800 ? window.innerWidth / 2 : 200; 
            const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };    
    return (
        <div className="p-4 ">
            <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                    <div className="h-[60px] w-[4px] rounded-md bg-cyan-500"></div>
                    <h2 className="text-3xl font-bold">Stock</h2>
                </div>
                <div className="flex items-center gap-2 justify-center">
                        
                        <h3 className="text-sm font-bold">Plus de voitures</h3>
                        <FaArrowRight size={17} color="cyan"/>
                </div>
               
                
            </div>
            <div className="relative">
                <div className="absolute z-30 left-0 bg-black bg-opacity-70 w-12 sm:w-16 md:w-20 lg:w-24 h-full cursor-pointer" onClick={() => scroll('left')}>
                    <IoIosArrowDropleftCircle size={30} color="white" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                </div>
                <div className="absolute z-30 right-0 bg-black bg-opacity-70 w-12 sm:w-16 md:w-20 lg:w-24 h-full cursor-pointer" onClick={() => scroll('right')}>
                    <IoIosArrowDropleftCircle size={30} color="white" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-180"/>
                </div>
                <div ref={scrollContainerRef} className="flex w-full overflow-x-hidden overflow-y-hidden gap-2 sm:gap-3 md:gap-4 sticky top-0 py-2 sm:py-3 md:py-4">
                    {Videos.map((video) => (
                        <div key={video.id} className="relative bg-slate-800 rounded-lg w-[25%] sm:w-[45%] md:w-[30%] h-[300px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex-shrink-0">
                            <img src={`${UrlData}Data/${video.poster}`} alt={video.title} className="w-full h-full object-cover rounded-lg" />
                            <h3 className="absolute z-40 bottom-2 left-2 text-sm sm:text-base md:text-lg font-bold">{video.title}</h3>       
                            <div className="h-[25px] sm:h-[30px] md:h-[35px] lg:h-[40px] w-full bg-black bg-opacity-55 absolute bottom-0 z-30"></div>
                            <button 
                            onClick={() => addFavorite(video)}
                            className="flex justify-center items-center h-10 w-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 absolute top-2 right-2">
                                <MdFavoriteBorder size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}