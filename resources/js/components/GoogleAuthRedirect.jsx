import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // or any router you're using
import GoogleLoginApis from '../apis/GoogleLoginApis';

const GoogleAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Capture the authorization code from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log('token', token)
        if (token) {
            // If token exists, save it to localStorage
            localStorage.setItem('token', token);
            console.log('Token saved:', token);
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                navigate('/');
            }
            // Redirect the user to the desired page (e.g., contact page)
        } else {
            // Handle the case where the token is missing
            console.error('No token found in the URL');
        }
    }, [navigate]);

    // const handleCallback = async (token) => {
    //     // try {
    //         // Call the API to exchange the code for a token
    //         // const res = await GoogleLoginApis.handleGoogleCallback(token);
            
    //         localStorage.setItem('token', token);
    //         navigate('/contact');

    //     //     if (res && res.token) {
    //     //         // Save the token in localStorage or wherever you manage authentication
                
    //     //         // Redirect the user to the dashboard or some other page
    //     //         navigate('/contact');
    //     //     } else {
    //     //         console.error('Google login failed');
    //     //         navigate('/login'); // Redirect back to login on failure
    //     //     }
    //     // } catch (error) {
    //     //     console.error('Error handling Google callback:', error);
    //     //     navigate('/login'); // Redirect back to login on failure
    //     // }
    // };

    return <div>Loading...</div>;
};

export default GoogleAuthRedirect;
