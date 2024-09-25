import React, { useState, useRef, useEffect } from 'react';
import { IoLanguageSharp } from 'react-icons/io5';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh-CN', name: 'Chinese' },
];

const LanguageDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLanguageChange = (languageCode) => {
    // Redirect the user to the Google Translate page with the selected language
    const currentURL = window.location.href;
    const googleTranslateUrl = `https://translate.google.com/translate?hl=${languageCode}&sl=auto&tl=${languageCode}&u=${encodeURIComponent(currentURL)}`;
    window.location.href = googleTranslateUrl;
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 font-semibold cursor-pointer">
        <IoLanguageSharp className='text-lg' /> Languages
      </button>
      {showDropdown && (
        <div className="absolute bg-white dark:bg-black shadow-lg rounded mt-2 w-48 z-10" ref={dropDownRef}>
          <ul className="py-2">
            {languages.map((lang) => (
              <li 
                key={lang.code} 
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
