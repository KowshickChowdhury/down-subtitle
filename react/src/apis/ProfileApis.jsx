import axios from "axios";
import { globalConfig } from "../Global";

const ProfileApis = {};

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

ProfileApis.index = async() => {
    const res = await axios.get(`${globalConfig.apiUrl}/api/profile`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
    return res;
};

ProfileApis.logout = async (data) => {
    let url = `${globalConfig.apiUrl}/api/logout`;
    const res = await axios.post(url, data)
        .then(response => {
            return response.data;
        }).catch(error => { 
            return error;
        });
    return res;
}

export default ProfileApis;