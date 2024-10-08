import axios from "axios";
import { globalConfig } from "../Global";

const HistoryApis = {};

HistoryApis.index = async() => {
    const res = await axios.get(`${globalConfig.apiUrl}/api/histories`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
    return res;
};

HistoryApis.delete = async (id) => {
    const url = `${globalConfig.apiUrl}/api/history/${id}`;
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

HistoryApis.clearAll = async () => {
    const url = `${globalConfig.apiUrl}/api/histories`;
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default HistoryApis;