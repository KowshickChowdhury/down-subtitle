const HistoryApis = {};

HistoryApis.index = async() => {
    const res = await axios.get("/api/histories")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
    return res;
};

HistoryApis.delete = async (id) => {
    const url = `/api/history/${id}`;
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default HistoryApis;