"use client"
import { useContext, useState } from "react";
import { FavoriteContext } from "../context/favoriteContext";
import { IoIosSearch } from "react-icons/io";
import { CiBookmarkRemove } from "react-icons/ci";

const UrlData = "http://localhost:8000/"

export default function Videos_Api() {  
    const { favorites,removeFavorite,Message} = useContext(FavoriteContext);
    const [searchTerm, setSearchTerm] = useState("");
    const filteredVideos = favorites.filter(video => video.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return (
        <div className="flex flex-col min-h-screen bg-black text-white items-center p-4">
                <div className="w-full h-full mt-24 ">
                    {
                        Message!=""?(
                            <div className="absolute z-20 top-20 left-1/2 -translate-x-1/2 h-[20px] p-6 rounded-xl bg-red-500 flex flex-col justify-center items-center">
                                <h1 className="text-xs font-bold">{Message}</h1>
                            </div>
                        ):null
                    }
                    <div className="flex flex-col items-center mb-4">
                        <h1 className="text-3xl font-bold mb-2">
                        Retournez sur la piste avec vos voitures favorites
                        </h1>
                        <h3 className="text-lg text-cyan-500">
                        Regardez à nouveau les vidéos et vivez l’expérience de chaque modèle."
                        </h3>
                        <div className="relative flex items-center mt-2">
                            <input type="text" placeholder="Trouver votre voiture ..." 
                            className=" placeholder:text-white p-2 border bg-cyan-600 border-white rounded-lg w-[30vw] focus:outline-none "
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />
                             <IoIosSearch 
                            size={30}
                            className="text-white absolute top-1/2 right-2 transform -translate-y-1/2"
                            />
                           
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-6 gap-6 mt-20 sm:mt-0">
                    {
                        filteredVideos.length > 0 ? (
                        filteredVideos.map((video, index) => (
                            <div className="relative md:flex flex-row md:pl-20 h-[20vh]" key={index}>
                                 <img src={UrlData + "Data/" + video.poster} alt={video.title} className="absolute md:top-1/2 md:left-1 right-0 z-50 transform -translate-y-1/2 md:w-[15vw] lg:w-[12vw] md:h-[14vh] h-[8vh] object-cover rounded-lg shadow-lg shadow-black" />

                                <div className="relative flex flex-col p-5 rounded-lg text-black bg-cyan-200 hover:bg-white transition-transform duration-300 ease-in-out transform hover:scale-105  shadow-md hover:shadow-xl">
                                  <div className="flex flex-col  md:w-[30vw] md:pl-[8vw]  ">
                                  <h1 className=" text-xl font-extrabold">{video.title}</h1>
                                  <p className=" text-sm font-medium   ">{video.desc.slice(0, 100)}</p>
                                  <button className=" bg-black text-white font-bold p-2  mt-4 rounded">
                                    Plus d'infos
                                  </button>
                                  
                                  </div>
                                  <CiBookmarkRemove 
                                  onClick={() => {
                                    removeFavorite(video);
                                  }}
                                  size={30}
                                  className="text-red-500 absolute top-2 right-2 cursor-pointer"
                                  />
                                </div>
                                
                              

                              
                            
                            </div>
                            
                        ))
                        ) : (
                        <div className="flex flex-col items-center p-5 rounded-lg bg-slate-950 hover:bg-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-105  shadow-md hover:shadow-xl">
                            <p className="text-white">No favorite videos found.</p>
                        </div>
                        )
                    }
                    </div>           
                </div>
        </div>
    );
}