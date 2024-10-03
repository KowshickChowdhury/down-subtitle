// axios.js or http-common.js (Axios Configuration File)
import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Set your base API URL
    withCredentials: true,         // Ensure cookies are sent with all requests
    headers: {
        'Accept': 'application/json'
    }
});

export default axiosInstance;
