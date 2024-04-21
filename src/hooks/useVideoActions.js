import { useState } from 'react';
import * as likeServices from '~/services/likeServices';

function useVideoActions(data) {
    const [isLiked, setIsLiked] = useState(data ? data.is_liked : false);
    const [likesCount, setLikesCount] = useState(data ? data.likes_count : 0);
    // video action
    const fetchLikeVideo = async () => {
        const result = await likeServices.likeVideo(data?.id);
        if (result) {
            setIsLiked(result.is_liked);
            setLikesCount(result.likes_count);
        }
    };
    const fetchUnLikeVideo = async () => {
        const result = await likeServices.unlikeVideo(data?.id);
        if (result) {
            setIsLiked(result.is_liked);
            setLikesCount(result.likes_count);
        }
    };
    const handleToggleLike = () => {
        isLiked ? fetchUnLikeVideo() : fetchLikeVideo();
    };

    return { isLiked, likesCount, handleToggleLike, fetchLikeVideo, fetchUnLikeVideo };
}

export default useVideoActions;
