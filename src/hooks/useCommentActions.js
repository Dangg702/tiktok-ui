import { useState } from 'react';
import * as likeServices from '~/services/likeServices';

function useCommentActions(data) {
    const [cmtIsLiked, setCmtIsLiked] = useState(data ? data.is_liked : false);
    const [cmtLikesCount, setCmtLikesCount] = useState(data?.likes_count);
    // video action
    const fetchLikeVideoComment = async () => {
        const result = await likeServices.likeVideoComment(data.id);
        if (result) {
            setCmtIsLiked(result.is_liked);
            setCmtLikesCount(result.likes_count);
        }
    };
    const fetchUnLikeVideoComment = async () => {
        const result = await likeServices.unLikeVideoComment(data.id);
        if (result) {
            setCmtIsLiked(result.is_liked);
            setCmtLikesCount(result.likes_count);
        }
    };
    const handleToggleLikeCmt = () => {
        cmtIsLiked ? fetchUnLikeVideoComment() : fetchLikeVideoComment();
    };

    return { cmtIsLiked, cmtLikesCount, handleToggleLikeCmt, fetchLikeVideoComment, fetchUnLikeVideoComment };
}

export default useCommentActions;
