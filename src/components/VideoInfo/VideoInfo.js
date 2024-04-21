import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';

import { FollowContext } from '~/components/FollowContext';
import * as followService from '~/services/followService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Tippy from '@tippyjs/react/headless';
import AccountPreview from '../AccountPreview/AccountPreview';
import Button from '~/components/Button';
import { MusicIcon } from '~/components/Icons';
import styles from './VideoInfo.module.scss';

const cx = classNames.bind(styles);

function VideoInfo({ data }) {
    const followContext = useContext(FollowContext);

    const handleFollow = () => {
        followContext.setIsFollowed(data.user.is_followed);
        // followed / login
        followContext.isFollowed ? followContext.fetchUnFollow(data.user.id) : followContext.fetchFollow(data.user.id);
    };

    const renderPreview = (attrs) => (
        <div className={cx('account-preview')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('account-popper')}>
                <AccountPreview data={data.user} />
            </PopperWrapper>
        </div>
    );

    return (
        <div className={cx('text-info')}>
            <div>
                <Tippy
                    delay={[800, 500]}
                    offset={[-70, 30]}
                    interactive
                    placement="bottom-start"
                    render={renderPreview}
                >
                    <Link className={cx('author-anchor')} to={`/@${data.user.nickname}`}>
                        <h3 className={cx('username')}>
                            {data.user.nickname}
                            {data.user.tick && (
                                <FontAwesomeIcon className={cx('blue-tick-icon')} icon={faCheckCircle} />
                            )}
                        </h3>
                        <h4 className={cx('name')}>
                            {data.user.first_name} {data.user.last_name}
                        </h4>
                    </Link>
                </Tippy>
            </div>

            {followContext.isFollowed ? (
                <Button className={cx('follow-btn')} outlineGray small onClick={handleFollow}>
                    Following
                </Button>
            ) : (
                <Button className={cx('follow-btn')} outlinePrimary small onClick={handleFollow}>
                    Follow
                </Button>
            )}

            <div className={cx('video-desc-wrapper')}>
                <span className={cx('video-desc')}>{data.description}</span>
                <div className={cx('hashtag-wrapper')}>
                    {/* <a className={cx('video-hashtag')} href="https://www.tiktok.com/tag/travel">
                        <strong className={cx('hashtag-link')}>#travel</strong>
                    </a> */}
                </div>
            </div>
            <h4 className={cx('video-music')}>
                <a
                    className={cx('video-music-link')}
                    href="https://www.tiktok.com/music/Chill-in-a-good-mood-calm-and-fun-1263486-7109534877573187586"
                >
                    {!data.music || <MusicIcon className={cx('music-icon')} />}
                    {data.music}
                </a>
            </h4>
        </div>
    );
}

export default VideoInfo;
