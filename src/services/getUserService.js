import * as httpRequest from '~/utils/httpRequest';

export const getUser = async (nickname) => {
    try {
        const res = await httpRequest.get('users/@' + nickname);
        return res.data;
    } catch (error) {
        console.log('get user error: ', error);
    }
};

export const getCurrentUser = async () => {
    try {
        const res = await httpRequest.get('auth/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        return res.data;
    } catch (error) {
        console.log('get current user error: ', error);
    }
};
