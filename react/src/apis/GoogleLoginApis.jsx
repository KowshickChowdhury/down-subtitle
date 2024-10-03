import axios from "axios";
import { globalConfig } from "../Global";

const GoogleLoginApis = {};

GoogleLoginApis.googleLogin = async () => {
    const res = await axios.get(`${globalConfig.apiUrl}/api/auth/google`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        return error;
    })
    return res;
}

GoogleLoginApis.handleGoogleCallback = async (code) => {
    try {
        // Make a request to Laravel API with the code from Google
        const response = await axios.get(`${globalConfig.apiUrl}/api/auth/google/callback?code=${code}`);
        return response.data; // This should return your Sanctum token
    } catch (error) {
        console.error('Error during Google callback', error);
        return null;
    }
};

export default GoogleLoginApis;