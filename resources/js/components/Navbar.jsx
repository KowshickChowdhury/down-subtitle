import React, { useState, useRef, useEffect } from 'react';
import { IoMdHome } from 'react-icons/io';
import { LuHistory } from 'react-icons/lu';
import { FaRegListAlt } from 'react-icons/fa';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { IoClose, IoLanguageSharp, IoMenu } from 'react-icons/io5';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';
import LanguageDropdown from './LanguageDropdown';

const Navbar = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [menuOpen, setMenuOpen] = useState();
  const sidebarRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen])
  

  return (
    <div className='bg-white dark:bg-black text-black dark:text-white p-2 border-b dark:border-b-[#161722] shadow-sm'>
        <nav className=" max-w-7xl mx-auto flex items-center justify-between ">
            <div className="flex items-center">
                <img src={darkMode ? 'https://downsub.com/img/logo-white.png' : 'https://downsub.com/img/logo.png'} alt="Logo" className="h-12" />
            </div>
            {/* Menu Button for small screens */}
            <div className="lg:hidden">
              <button onClick={toggleMenu} className="text-gray-800 dark:text-white">
                {menuOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
              </button>
            </div>
            {/* Links - visible on larger screens */}
            <ul className="hidden lg:flex items-center">
              <li className={`ml-4 px-3 py-1 rounded ${location.pathname === '/' ? 'dark:bg-[#404040] bg-slate-200' : ''}`}>
                <Link to='/' className='flex items-center gap-2 font-semibold cursor-pointer'>
                  <IoMdHome className='text-lg' /> Home
                </Link>
              </li>
              <li className={`ml-4 px-3 py-1 rounded ${location.pathname === '/history' ? 'bg-slate-200' : ''}`}>
                <Link to='/history' className='flex items-center gap-2 font-semibold cursor-pointer'>
                  <LuHistory className='text-lg' /> History
                </Link>
              </li>
              <li className={`ml-4 px-3 py-1 rounded ${location.pathname === '/sites' ? 'bg-slate-200' : ''}`}>
                <Link to='/' className='flex items-center gap-2 font-semibold cursor-pointer'>
                  <FaRegListAlt className='text-lg' /> Supported Sites
                </Link>
              </li>
              <li className={`ml-4 px-3 py-1 rounded ${location.pathname === '/contact' ? 'bg-slate-200' : ''}`}>
                <Link to='/' className='flex items-center gap-2 font-semibold cursor-pointer'>
                <RiQuestionnaireFill className='text-lg' /> Contact
                </Link>
              </li>
              <li className="flex items-center gap-2 ml-4 font-semibold cursor-pointer">
                <LanguageDropdown />
              </li>
              <li 
                className='flex items-center gap-2 ml-4 font-semibold cursor-pointer' 
                onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <MdLightMode /> : <MdDarkMode />}
                Mode
              </li>
            </ul>

            {/* Mobile Sliding Menu */}
            <div 
              ref={sidebarRef}
              className={`lg:hidden fixed inset-y-0 left-0 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-white dark:bg-black w-64 z-50 shadow-lg`}
            >
              <ul className="flex flex-col mt-4 space-y-4 p-4">
                <li className="flex items-center gap-2 font-semibold cursor-pointer">
                  <IoMdHome /> Home
                </li>
                <li className="flex items-center gap-2 font-semibold cursor-pointer">
                  <LuHistory /> History
                </li>
                <li className="flex items-center gap-2 font-semibold cursor-pointer">
                  <FaRegListAlt /> Supported Sites
                </li>
                <li className="flex items-center gap-2 font-semibold cursor-pointer">
                  <RiQuestionnaireFill /> Contact
                </li>
                <li className="flex items-center gap-2 font-semibold cursor-pointer">
                  <IoLanguageSharp /> Languages
                </li>
                <li 
                  className='flex items-center gap-2 font-semibold cursor-pointer' 
                  onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? <MdLightMode /> : <MdDarkMode />}
                  Mode
                </li>
              </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar