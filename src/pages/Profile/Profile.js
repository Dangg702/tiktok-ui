import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '~/components/Button/Button';
import {
    ArrowDownIcon,
    BlockIcon,
    FlagIcon,
    LockIcon,
    MoreActionIcon,
    PauseIcon,
    ShareOutLineIcon,
    UserCheckIcon,
    UserIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import { FollowContext } from '~/components/FollowContext';
import { LoginContext } from '~/components/LoginContext';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { render5FirstItem, renderAllItem } from '~/components/VideoItem/ShareList';
import * as getUserService from '~/services/getUserService';
import styles from './Profile.module.scss';
import EditProfileForm from '~/components/EditProfileForm';

const cx = classNames.bind(styles);

function Profile() {
    const followContext = useContext(FollowContext);
    const loginContext = useContext(LoginContext);
    const { nickname } = useParams();
    const currentNicknameUser = loginContext.data ? '@' + loginContext.data.nickname : '';
    const videoRef = useRef(null);
    const [data, setData] = useState({});
    const [listVideo, setListVideo] = useState([]);
    const [hideArrowIcon, setHideArrowIcon] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getUserService.getUser(nickname);
            if (result) {
                setData(result);
                setListVideo(result.videos);
            }
        };
        fetchApi();
    }, [nickname]);

    const ArrowClasses = cx('share-arrow', {
        hide: hideArrowIcon,
    });

    const handleFollow = () => {
        followContext.setIsFollowed(data.is_followed);
        // followed / login
        followContext.isFollowed ? followContext.fetchUnFollow(data.id) : followContext.fetchFollow(data.id);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('head-container')}>
                <div className={cx('user-info')}>
                    <Image className={cx('avatar')} src={data.avatar} alt="avatar" />
                    <div className={cx('user-desc')}>
                        <h1 className={cx('user-title')}>
                            {data.nickname}
                            <span>{data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}</span>
                        </h1>
                        <h2 className={cx('user-subtitle')}>
                            {data.first_name} {data.last_name}
                        </h2>

                        <div className={cx('user-follow')}>
                            {nickname === currentNicknameUser ? (
                                <>
                                    <EditProfileForm />
                                </>
                            ) : followContext.isFollowed ? (
                                <>
                                    <Button className={cx('message-btn')} outlinePrimary>
                                        Message
                                    </Button>
                                    <Tippy delay={[800, 500]} placement="bottom" content="Unfollow">
                                        <Button className={cx('user-btn')} outlineGray onClick={handleFollow}>
                                            <UserCheckIcon />
                                        </Button>
                                    </Tippy>
                                </>
                            ) : (
                                <Button className={cx('follow-btn')} primary onClick={handleFollow}>
                                    Follow
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <h3 className={cx('user-stats')}>
                    <div className={cx('user-stat')}>
                        <strong>{data.followings_count === null ? '0' : data.followings_count}</strong>
                        <span>Following</span>
                    </div>
                    <div className={cx('user-stat')}>
                        <strong>{data.followers_count === null ? '0' : data.followers_count}</strong>
                        <span>Followers</span>
                    </div>
                    <div className={cx('user-stat')}>
                        <strong>{data.likes_count === null ? '0' : data.likes_count}</strong>
                        <span>Likes</span>
                    </div>
                </h3>
                <div className={cx('user-bio')}>{data.bio}</div>
                <TippyHeadless
                    delay={[800, 500]}
                    offset={[-20, 5]}
                    interactive
                    placement="bottom"
                    render={(attrs) => (
                        <div className={cx('share-wrapper')} tabIndex="-1" {...attrs}>
                            <PopperWrapper className={cx('share-popper')}>
                                {hideArrowIcon ? renderAllItem() : render5FirstItem()}
                                <Button href="#" className={ArrowClasses} onClick={() => setHideArrowIcon(true)}>
                                    {<ArrowDownIcon />}
                                </Button>
                            </PopperWrapper>
                        </div>
                    )}
                    onHide={() => setHideArrowIcon(false)}
                >
                    <div className={cx('share-action')}>
                        <ShareOutLineIcon />
                    </div>
                </TippyHeadless>
                <TippyHeadless
                    delay={[800, 500]}
                    offset={[-20, 5]}
                    interactive
                    placement="bottom"
                    render={(attrs) => (
                        <div className={cx('more-wrapper')} tabIndex="-1" {...attrs}>
                            <PopperWrapper className={cx('more-popper')}>
                                <div className={cx('more-item')}>
                                    <Button className={cx('more-item-btn')} leftIcon={<FlagIcon />}>
                                        Report
                                    </Button>
                                </div>
                                <div className={cx('more-item')}>
                                    <Button className={cx('more-item-btn', 'separate')} leftIcon={<BlockIcon />}>
                                        Block
                                    </Button>
                                </div>
                            </PopperWrapper>
                        </div>
                    )}
                    onHide={() => setHideArrowIcon(false)}
                >
                    <div className={cx('more-action')}>
                        <MoreActionIcon />
                    </div>
                </TippyHeadless>
            </div>

            <div className={cx('body-container')}>
                <div className={cx('feed-tab')}>
                    <p className={cx('feed-tab-item')}>
                        <span>Videos</span>
                    </p>
                    <p
                        id="favorite"
                        className={cx('feed-tab-item')}
                        onMouseOver={(e) => console.log(e.target.closest('#favorite').offsetWidth)}
                    >
                        <LockIcon className={cx('lock-icon')} />
                        <span>Favorites</span>
                    </p>
                    <p className={cx('feed-tab-item')}>
                        <LockIcon className={cx('lock-icon')} />
                        <span>Liked</span>
                    </p>
                    <div className={cx('bottom-line')}></div>
                </div>

                {data && data.video && data.videos.length === 0 && (
                    <div className={cx('detail-wrapper')}>
                        <div className={cx('detail-content')}>
                            <UserIcon width="150" height="150" className={cx('user-icon')} />
                            <p className={cx('detail-title')}>This account is private</p>
                            <p className={cx('detail-desc')}>Follow this account to see their videos</p>
                        </div>
                    </div>
                )}

                <div className={cx('four-column')}>
                    <div className={cx('video-item-list')}>
                        {listVideo.map((item, key) => (
                            <div className={cx('video-item')} key={key}>
                                <Link to={`/videos/${item.uuid}`}>
                                    <video
                                        src={item.file_url}
                                        ref={videoRef}
                                        onMouseOver={(e) => e.target.play()}
                                        onMouseOut={(e) => {
                                            e.target.pause();
                                            e.target.currentTime = 0;
                                        }}
                                        muted
                                        // onClick={}
                                    ></video>
                                </Link>
                                <div className={cx('video-item-info')}>
                                    <PauseIcon width="18" height="18" className={cx('pause-icon')} />
                                    <span>{item.views_count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
