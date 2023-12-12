import { createContext, useState, useEffect } from 'react';
import * as followService from '~/services/followService';

const FollowContext = createContext();

function FollowProvider({ children }) {
    const [isFollowed, setIsFollowed] = useState(false);

    const fetchFollow = async (userId) => {
        const result = await followService.follow(userId);
        if (result) {
            setIsFollowed(result.is_followed);
        }
    };

    const fetchUnFollow = async (userId) => {
        const result = await followService.unFollow(userId);
        if (result) {
            setIsFollowed(result.is_followed);
        }
    };

    const value = {
        isFollowed,
        setIsFollowed,
        fetchFollow,
        fetchUnFollow,
    };

    return <FollowContext.Provider value={value}>{children}</FollowContext.Provider>;
}

export { FollowContext, FollowProvider };
