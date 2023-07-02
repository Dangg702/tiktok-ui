import axios from 'axios';
// create an axios instance
const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (path, options = {}) => {
    try {
        const response = await request.get(path, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};
export default request;
