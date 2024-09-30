import React, { useState, useEffect } from 'react';
import ProfileApis from '../apis/ProfileApis';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const Profile = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        setLoading(true);
        const res = await ProfileApis.index();
        console.log('res', res);
        if (res.success) {
            setUser(res.data);
        }
        setLoading(false);
    };

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
                    setTimeout(() => {
                        navigate('/');
                    }, 1000)
                }
            }
        });
    };

    return (
        <div>
            {loading ? <div>Loading...</div> :
                <div>
                    <img
                        src={user ? user.avatar : ''}
                        className="w-10 rounded-full cursor-pointer"
                        alt=""
                    />

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
                                    onClick={handleLogout}
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
             }
        </div>
    );
};

export default Profile;
