import React, { useState, useEffect, useRef } from 'react';
import ProfileApis from '../apis/ProfileApis';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import Comments from './Comments';

const MySwal = withReactContent(Swal);

const Profile = ({ loading, user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
    
        if (isOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen])

    const handleLogout = async () => {
        MySwal.fire({
            title: <p>Are you sure?</p>,
            text: 'You will be logged out.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await ProfileApis.logout();
                if (res.success) {
                    localStorage.removeItem('token');
                    MySwal.fire({
                        title: <p>Logged out!</p>,
                        text: 'You have been logged out successfully.',
                        icon: 'success',
                    });
                    localStorage.removeItem('hasReload');
                    setTimeout(() => {
                        navigate('/');
                    }, 1000)
                }
            }
        });
    };

    const handleProfileDropDown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            {loading ? <div>Loading...</div> :
                <div>
                    <img
                        src={user ? user.avatar : ''}
                        className="w-10 rounded-full cursor-pointer grid items-end"
                        onClick={handleProfileDropDown}
                        alt=""
                    />

                    {isOpen && (
                        <div
                            id="dropdown"
                            ref={dropdownRef}
                            className="z-10 bg-white divide-y divide-gray-100 rounded-l-lg rounded-br-lg shadow w-24 dark:bg-gray-700 absolute right-0 md:right-80"
                        >
                            <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownDefaultButton"
                            >
                                <li>
                                    <a
                                        href="#"
                                        className="justify-between block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={handleLogout}
                                    >
                                        <div className='flex gap-1 items-center'>
                                            Logout
                                            <IoLogOut className='text-xl'/>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
             }
        </div>
    );
};

export default Profile;
