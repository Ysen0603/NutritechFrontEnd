"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { FiMenu } from "react-icons/fi";

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const activeLink = (path) => {
        if (path === pathname) {
            return "text-cyan-500 font-bold border-b-2 border-white"
        }
        return "text-white font-bold"
    };
    
    const onscroll = () => {
        const header = document.querySelector("header");
        header.classList.toggle("bg-black", window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener("scroll", onscroll);
        return () => window.removeEventListener("scroll", onscroll);
    }, []);

    return (
        <header className="fixed z-40 w-full flex justify-between items-center p-4 transition-all duration-300">
            <div className="flex items-center">
                <button className="md:hidden mr-4 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <FiMenu size={24} />
                </button>
                <h1 className="text-3xl text-cyan-500 font-bold">LOGO</h1>
            </div>
            <nav className={`md:flex md:space-x-10 ${isMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-black ' : 'hidden'}`}>
                <Link className={`${activeLink("/")} hover:text-cyan-500 block py-2 md:inline`} href="/">Accueil</Link>
                <Link className={`${activeLink("/favorites")} hover:text-cyan-500 block py-2 md:inline`} href="/favorites">Favoris</Link>      
            </nav>
            <button className="flex flex-row items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl transition-colors duration-200 bg-cyan-500 text-black">
                <Link href={`/`}><span className="font-bold text-sm md:text-base">Login</span></Link>
            </button>
            
            
        </header>
    )
}