import React, { useState } from 'react';
import logo from '../assets/logo.svg'
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // State to track if mobile menu is open or closed
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    // Navigate and close mobile menu when a menu item is clicked
    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false); // Close menu on item click
    };

    return (
        <nav className="fixed top-0 w-full bg-white">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a 
                    onClick={() => { navigate('/'); setMenuOpen(false); }} 
                    className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
                >
                    <img src={logo} className="h-8" alt="Unfolo Logo" />
                </a>

                {/* Mobile menu toggle button */}
                <button 
                    type="button" 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
                    aria-controls="navbar-default" 
                    aria-expanded={menuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>

                {/* Navigation links - show/hide based on menuOpen state on mobile */}
                <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <a
                                onClick={() => handleNavigate('/')}
                                className={`block py-2 px-3 rounded-sm md:p-0 cursor-pointer ${
                                    isActive('/')
                                        ? 'text-white bg-[var(--color-primary)] md:bg-transparent md:text-[var(--color-primary)]'
                                        : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[var(--color-primary)]'
                                }`}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => handleNavigate('/tutorial')}
                                className={`block py-2 px-3 rounded-sm md:p-0 cursor-pointer ${
                                    isActive('/tutorial')
                                        ? 'text-white bg-[var(--color-primary)] md:bg-transparent md:text-[var(--color-primary)]'
                                        : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[var(--color-primary)]'
                                }`}
                            >
                                Tutorial
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
