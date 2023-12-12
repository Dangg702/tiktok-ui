import * as httpRequest from '~/utils/httpRequest';

export const getListVideos = async (type, page) => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error.response);
    }
};

export const getVideo = async (videoId) => {
    try {
        const res = await httpRequest.get(`videos/${videoId}`);
        return res.data;
    } catch (error) {
        console.log(error.response);
    }
};
