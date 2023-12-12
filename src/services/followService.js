import * as httpRequest from '~/utils/httpRequest';

export const followList = async (page) => {
    try {
        const res = await httpRequest.get('me/followings', {
            params: {
                page,
            },
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return res.data;
    } catch (error) {
        console.log(error.response);
    }
};

export const follow = async (userId) => {
    const data = {};
    const options = {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };
    try {
        const res = await httpRequest.post(`users/${userId}/follow`, data, options);
        return res.data;
    } catch (error) {
        console.log(error.response);
    }
};

export const unFollow = async (userId) => {
    const data = {};
    const options = {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };
    try {
        const res = await httpRequest.post(`users/${userId}/unfollow`, data, options);
        return res.data;
    } catch (error) {
        console.log(error.response);
    }
};
