import axios from 'axios';
// create an axios instance
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const get = async (path, options = {}) => {
    try {
        const response = await httpRequest.get(path, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};
export default httpRequest;
