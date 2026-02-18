import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/omdb';
import authService from '../services/auth';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Debounced search
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.length > 2) {
                try {
                    const results = await searchMovies(searchQuery);
                    setSearchResults(results || []);
                    setShowDropdown(true);
                } catch (error) {
                    console.error("Search failed", error);
                    setSearchResults([]);
                }
            } else {
                setSearchResults([]);
                setShowDropdown(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleResultClick = (id) => {
        navigate(`/movie/${id}`);
        setShowDropdown(false);
        setSearchQuery('');
    };

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileRef = useRef(null);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    // Click outside to close profile menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'
                }`}
        >
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">

                {/* Left Side: Brand & Links */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl font-bold text-red-600 tracking-wider">
                        MOVIE<span className="text-white">Z</span>
                    </Link>

                    <ul className="hidden md:flex gap-6 text-sm text-gray-300">
                        <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="#" className="hover:text-white transition-colors">Movies</Link></li>
                        <li><Link to="#" className="hover:text-white transition-colors">TV Shows</Link></li>
                        <li><Link to="#" className="hover:text-white transition-colors">My List</Link></li>
                    </ul>
                </div>

                {/* Right Side: Search & Profile */}
                <div className="flex items-center gap-6">

                    {/* Search Box */}
                    <div className="relative" ref={searchRef}>
                        <div className="flex items-center bg-black/40 border border-white/30 rounded-full px-3 py-1 focus-within:bg-black/80 focus-within:border-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Titles, people, genres"
                                className="bg-transparent border-none focus:outline-none text-white text-sm ml-2 w-32 md:w-64 placeholder-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Dropdown Results */}
                        {showDropdown && searchResults.length > 0 && (
                            <div className="absolute top-full right-0 mt-2 w-72 bg-[#181818] border border-gray-700 rounded shadow-xl overflow-hidden">
                                {searchResults.slice(0, 5).map((movie) => (
                                    <div
                                        key={movie.imdbID}
                                        className="flex items-center gap-3 p-3 hover:bg-[#282828] cursor-pointer transition-colors border-b border-gray-800 last:border-none"
                                        onClick={() => handleResultClick(movie.imdbID)}
                                    >
                                        <img
                                            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/40x60'}
                                            alt={movie.Title}
                                            className="w-10 h-14 object-cover rounded bg-gray-800"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-white text-sm font-medium truncate w-48">{movie.Title}</span>
                                            <span className="text-gray-500 text-xs">{movie.Year}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Profile Avatar & Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <div
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs ring-1 ring-white/20 group-hover:ring-white transition-all">
                                US
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 text-white transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>

                        {/* Profile Dropdown Menu */}
                        {showProfileMenu && (
                            <div className="absolute top-full right-0 mt-2 w-40 bg-[#181818] border border-gray-700 rounded shadow-xl overflow-hidden py-1">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#282828] hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sign out of MovieZ
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
