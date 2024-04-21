import * as httpRequest from '~/utils/httpRequest';

export const getComments = async (idVideo) => {
    try {
        try {
            const res = await httpRequest.get('videos/' + idVideo + '/comments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Success get Comment');
            return res.data;
        } catch (error) {
            console.log('errorGetComment: ', error.message);
        }
    } catch (error) {
        console.log('errorGetComment: ', error);
    }
};
export const postCommentService = async (uuid, newComment) => {
    try {
        const res = await httpRequest.post(
            'videos/' + uuid + '/comments',
            { comment: newComment },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        );
        console.log('successPostComment: ', res);
        return res;
    } catch (error) {
        console.log('errorPostComment: ', error);
    }
};
