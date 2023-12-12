import { useState, useContext } from 'react';
import * as GetUserService from '~/services/getUserService';

export default function useGetUser() {
    const [userData, setUserData] = useState();
    let [error, setError] = useState(null);

    const getCurrentUser = async () => {
        const result = await GetUserService.getCurrentUser();
        if (result) {
            setUserData(result);
            setError(null);
        } else {
            setError('');
        }
    };

    return { userData, error, getCurrentUser };
}
