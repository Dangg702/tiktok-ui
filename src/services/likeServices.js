import * as httpRequest from '~/utils/httpRequest';

export const likeVideo = async (videoId) => {
    const data = {};
    const options = {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };
    try {
        const res = await httpRequest.post(`videos/${videoId}/like`, data, options);
        return res.data;
    } catch (error) {
        console.log(error.response);
    }
};

export const unlikeVideo = async (videoId) => {
    const data = {};
    const options = {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };
    try {
        const res = await httpRequest.post(`videos/${videoId}/unlike`, data, options);
        return res.data;
    } catch (error) {
        console.log(error.response);
    }
};
