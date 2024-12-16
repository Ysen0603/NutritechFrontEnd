"use client"
import { useState,createContext } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);
    const [Message, setMessage] = useState("");

    const addFavorite = (favorite) => {

        if(!favorites.map((f) => f.id).includes(favorite.id)){
            setFavorites([...favorites, favorite])
            setMessage("Voiture ajouter avec success")
            setTimeout(() => {
                setMessage("")
            }, 3000);
        }
    }
    const removeFavorite = (favorite) => {
        setFavorites(favorites.filter((f) => f !== favorite));
        setMessage("Voiture supprimer avec success")
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }
    return (
        <FavoriteContext.Provider value={{Message,favorites, addFavorite, removeFavorite}}>
            {children}
        </FavoriteContext.Provider>
    )
}