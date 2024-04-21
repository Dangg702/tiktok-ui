import * as httpRequest from '~/utils/httpRequest';

export const UpdateProfileService = async (formData) => {
    try {
        const res = await httpRequest.patch('auth/me', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('successUpateProfile: ', res);
        return res;
    } catch (error) {
        console.log('errorUpdateProfile: ', error);
    }
};
