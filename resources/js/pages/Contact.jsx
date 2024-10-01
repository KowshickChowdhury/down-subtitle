import React, { useState, useEffect } from 'react'
import GoogleLoginApis from '../apis/GoogleLoginApis';
import Profile from '../components/Profile';
import ProfileApis from '../apis/ProfileApis';
import Comments from '../components/Comments';
import CommentApis from '../apis/CommentApis';

const Contact = () => {
    const [user, setUser] = useState();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const token = localStorage.getItem('token');
    const hasReload = localStorage.getItem('hasReload')

    useEffect(() => {
        if (token && !hasReload) {
            localStorage.setItem('hasReload', 'true');
            window.location.reload();
        }
    }, [token, hasReload])

    useEffect(() => {
        if (token) {
            getUser();
        }
        getComments();
    }, []);

    const handleDropDown = () => {
        setIsOpen(!isOpen);
    }

    const getComments = async() => {
        const res = await CommentApis.index();
        if (res.success) {
            setComments(res.data);
        }
    }

    const getUser = async () => {
        setLoading(true);
        const res = await ProfileApis.index();
        console.log('res', res);
        if (res.success) {
            setUser(res.data);
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        try {
            const res = await GoogleLoginApis.googleLogin();
            
            if (res && res.url) {
                window.location.href = res.url;
            }
        } catch (error) {
            console.error('Google login failed', error);
        }
    }
    
    
  return (
    <div className='max-w-7xl mx-auto dark:text-white'>
      <div className='border dark:border-slate-600 dark:bg-[#161616] bg-white p-4 rounded my-4'>
        <div>
            <h2 className='font-bold text-xl my-2'>If you report an error, please specify additional data:</h2>
            <p>- Address of the page (URL) from where you try to download the subtitles.</p>
            <p>- Links or messages displayed by our website.</p>
        </div>
        <div className='flex justify-between border-b py-4'>
            <div className='font-bold grid items-end text-gray-400'>{comments.length} Comments</div>
            <div>
                {token ?
                    <Profile loading={loading} user={user} />
                :
                <>
                    <button
                        id="dropdownDefaultButton"
                        onClick={handleDropDown}
                        className="dark:text-white focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center"
                        type="button"
                    >
                        Login
                        <svg
                        className="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                        >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                        </svg>
                    </button>
                    
                    {/* Dropdown menu */}
                    {isOpen && (
                        <div
                        id="dropdown"
                        className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-28 dark:bg-gray-700 absolute"
                        >
                        <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownDefaultButton"
                        >
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={handleGoogleLogin}
                                >
                                    Google
                                </a>
                            </li>
                            <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Facebook
                            </a>
                            </li>
                            <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Twitter
                            </a>
                            </li>
                        </ul>
                        </div>
                    )}
                </>
                }
            </div>
        </div>
        <Comments loading={loading} user={user} />
      </div>
    </div>
  )
}

export default Contact