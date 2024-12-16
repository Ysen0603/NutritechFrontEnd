"use client"
import {  useState, useRef, useEffect,useContext } from "react"
import { FaPlay, FaVolumeMute, FaVolumeUp, FaCircle } from 'react-icons/fa';
import { CgMoreVerticalR } from "react-icons/cg";
import Series from "./components/MoreVideo/Series";
import Link from "next/link";
import { FavoriteContext } from "./context/favoriteContext";
import { MdFavoriteBorder } from "react-icons/md";
const UrlData = "http://localhost:8000/"
export default function VideoHome() {
    const { addFavorite,Message} = useContext(FavoriteContext);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);
    const [Videos, setVideos] = useState([]);
    const [isloading, setisLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [more, setMore] = useState("hidden");
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const data = await fetch(`${UrlData}Videos`)
                const dataVideos = await data.json()
                if (dataVideos.length > 0) {
                    setVideos(dataVideos)
                    setCurrentVideoIndex(0)
                    
                    // Modification ici : essayez de forcer la lecture immédiate
                    setTimeout(() => {
                        if (videoRef.current) {
                            videoRef.current.play()
                        }
                    }, 500);  // Délai réduit à 500ms
                }
                setisLoading(false)
            } catch (error) {
                console.error("Erreur de chargement des vidéos:", error)
                setisLoading(false)
            }
        }
        fetchdata()
    }, [])
    const onscroll = () => {
        setIsMuted(window.scrollY > 0 ? true : false);
    };

    useEffect(() => {
        window.addEventListener("scroll", onscroll);
        return () => window.removeEventListener("scroll", onscroll);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsPlaying(true);
        }, 2000);
        setIsMuted(false);
    }, []);

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const switchVideo = (index) => {
        setCurrentVideoIndex(index);
        setIsPlaying(false);
        setTimeout(() => {
            setIsPlaying(true);
        }, 2000);
    };

    const autoSwitchVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % Videos.length);
        setIsPlaying(false);
        setCurrentTime(0);
        setTimeout(() => {
            setIsPlaying(true);
        }, 2000);
    };

    useEffect(() => {
        if (videoRef.current && currentTime >= duration - 0.1) {
            autoSwitchVideo();
        }
    }, [currentTime, duration]);

    const currentVideo = Videos[currentVideoIndex];
    if (isloading) {
      return (
          <div className=" text-white bg-black flex flex-col justify-center  min-h-screen items-center p-8">
              <h1 className='text-2xl font-bold'>Chargement des vidéos...</h1>
          </div>
      );
  }
    if (Videos.length === 0) {
      return (
          <div className=" text-white bg-black flex flex-col justify-center  min-h-screen items-center p-8">
              <h1 className='text-2xl font-bold'>Aucune vidéo disponible</h1>
          </div>
      );
  }
    return (
        <div className="relative flex flex-col min-h-screen text-white bg-black" >
            <div className="absolute z-20 top-0 bg-gradient-to-b from-black opacity-90 w-full h-[10vh]"></div>
            <div className="absolute z-20 left-0 h-[90vh] w-1/4 bg-gradient-to-r from-black"></div>
            {
              Message !== "" ? (
                <div className="fixed z-20 top-20 left-1/2 -translate-x-1/2 h-[20px] p-6 rounded-xl bg-green-600 flex flex-col justify-center items-center">
                  <h1 className="text-xs font-bold">{Message}</h1>
                </div>
              ) : null
            }
            <div className="relative w-full h-[90vh] ">
                    {isPlaying ? (
                        <video 
                            ref={videoRef}
                            src={`${UrlData}Data/${currentVideo.url}`}
                            autoPlay 
                            playsInline
                            muted={isMuted}
                            onLoadedMetadata={handleLoadedMetadata} 
                            onTimeUpdate={handleTimeUpdate}
                            
                            className="w-full h-[90vh] object-cover relative"
                        />
                    ) : (
                        <img src={`${UrlData}Data/${currentVideo.poster}`} alt="" className="animate-slideIn w-full h-[90vh] object-cover relative"/>
                    )}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 lg:p-12">
                  
                    <div className="flex flex-row md:flex-row justify-between items-start w-full mb-4">
                    <div className="relative z-20 flex flex-col gap-4 w-[80vw] md:w-1/2">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{currentVideo.title}</h1>
                            <ul className="flex flex-row gap-2 mb-2">
                              <li className="text-cyan-400 font-semibold text-sm md:text-base">Sport</li>
                              <li className="text-cyan-400 font-semibold text-sm md:text-base">Classique</li>
                              <li className="text-cyan-400 font-semibold text-sm md:text-base">Luxe</li>
                          </ul>
                            <p className="text-sm md:text-base lg:text-lg font-semibold w-full md:w-4/5  mb-4" onClick={() => setMore(more === "hidden" ? "visible" : "hidden")}>{currentVideo.desc.slice(0, 150)}
                                <span>{more === "hidden" ? "..." : ""}</span><span className={more}>
                                    {currentVideo.desc.slice(100, currentVideo.desc.length)}
                                </span>
                            </p>
                            <div className="flex flex-row gap-2">
                            <button className="flex flex-row items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl transition-colors duration-200 bg-cyan-500 text-black">
                                <Link href={`/`}><span className="font-bold text-sm md:text-base">Regarder maintenant</span></Link>
                                <FaPlay size={16} />
                            </button>
                            <button className="flex flex-row text-black items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl transition-colors duration-200 bg-white"> 
                                <span className="font-bold  text-sm md:text-base">Plus d'informations</span>
                                <CgMoreVerticalR size={16} />
                            </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-satrt gap-4 mb-4 md:mb-0">
                            <div className="flex gap-2">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="flex justify-center items-center h-10 w-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
                            >
                                {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                            </button>
                            <button 
                            onClick={() => addFavorite(currentVideo)}
                            className="flex justify-center items-center h-10 w-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300">
                                <MdFavoriteBorder size={20} />
                            </button>
                            </div>
                            <div className="flex gap-2">
                                {Videos.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => switchVideo(index)}
                                        className={`${index === currentVideoIndex ? 'text-cyan-400 scale-150' : ''}`}
                                    >
                                        <FaCircle size={12} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                <div className="w-full bg-white h-1">
                        <div className="h-full bg-cyan-400 duration-1000" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                </div>
            </div>
            <Series videos={Videos} />
        </div>
    );
}
