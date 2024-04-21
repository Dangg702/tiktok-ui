import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './CommentItem.module.scss';
import { useCommentActions } from '~/hooks';
import { HeartVideoIcon } from '../Icons';

const cx = classNames.bind(styles);

function CommentItem({ comment }) {
    const { cmtIsLiked, cmtLikesCount, handleToggleLikeCmt } = useCommentActions(comment);

    return (
        <>
            <div className={cx('comment-block')}>
                <Image className={cx('avatar')} src={comment?.user.avatar} alt="avatar" />
                <div className={cx('name-container')}>
                    <Link className={cx('username')} to={`/@${comment?.user.nickname}`}>
                        {comment?.user.nickname}
                        {comment?.user.tick && (
                            <FontAwesomeIcon className={cx('blue-tick-icon')} icon={faCheckCircle} />
                        )}
                    </Link>
                    <p className={cx('name')}>{comment.comment}</p>
                </div>
            </div>
            <div className={cx('like-comment')}>
                <button className={cx('btn-action-icon')} onClick={handleToggleLikeCmt}>
                    <span className={cx('cover-icon')}>
                        {cmtIsLiked ? <HeartVideoIcon className={cx('heart-active-icon')} /> : <HeartVideoIcon />}
                    </span>
                    <strong className={cx('count-icon')}>{cmtLikesCount}</strong>
                </button>
            </div>
        </>
    );
}

CommentItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default CommentItem;
