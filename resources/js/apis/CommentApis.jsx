const CommentApis = {};

CommentApis.index = async() => {
    try {
        const response = await axios.get('/api/all-comments');
        return response.data;
    } catch (error) {
        console.error('Error creating PayPal payment:', error);
        throw error;
    }
};

CommentApis.save = async(comment) => {
    try {
        const response = await axios.post('/api/comments', { comment });
        return response.data;
    } catch (error) {
        console.error('Error creating PayPal payment:', error);
        throw error;
    }
};


export default CommentApis;