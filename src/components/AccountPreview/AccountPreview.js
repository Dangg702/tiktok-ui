import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

import { FollowContext } from '~/components/FollowContext';
import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    const followContext = useContext(FollowContext);

    const handleFollow = () => {
        followContext.setIsFollowed(data.is_followed);
        // followed / login
        followContext.isFollowed ? followContext.fetchUnFollow(data.id) : followContext.fetchFollow(data.id);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image className={cx('avatar')} src={data.avatar} alt="avatar" />
                {followContext.isFollowed ? (
                    <Button className={cx('follow-btn')} outlineGray onClick={handleFollow}>
                        Following
                    </Button>
                ) : (
                    <Button className={cx('follow-btn')} outlinePrimary onClick={handleFollow}>
                        Follow
                    </Button>
                )}
            </div>
            <div className={cx('body')}>
                <div className={cx('name-container')}>
                    <Link className={cx('username')} to={`/@${data.nickname}`}>
                        {data.nickname}
                        {data.tick && <FontAwesomeIcon className={cx('blue-tick-icon')} icon={faCheckCircle} />}
                    </Link>
                    <p className={cx('name')}>
                        {data.first_name} {data.last_name}
                    </p>
                </div>
                <div className={cx('analytics-container')}>
                    <span className={cx('value')}>{data.followers_count}</span>
                    <span className={cx('label')}>Followers</span>
                    <span className={cx('value')}>{data.likes_count}</span>
                    <span className={cx('label')}>Likes</span>
                </div>
            </div>
            <div className={cx('footer')}>
                <p className={cx('bio')}>{data.bio}</p>
            </div>
        </div>
    );
}

export default AccountPreview;
