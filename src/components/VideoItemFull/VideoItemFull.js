import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import {
    ArrowDownIcon,
    FavoriteVideoIcon,
    FlagIcon,
    HeartVideoIcon,
    MusicIcon,
    MuteIcon,
    OpenCommentIcon,
    PLayIcon,
    PauseIcon,
    ShareIcon,
    VolumeIcon,
} from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { render5FirstItem, renderAllItem } from '../VideoItem/ShareList';
import { useVideo, useVideoActions } from '~/hooks';
import styles from './VideoItemFull.module.scss';
import { XIcon } from '~/components/Icons';
import config from '~/config';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { getComments, postCommentService } from '~/services/commentService';
import CommentItem from '~/components/CommentItem';

const cx = classNames.bind(styles);

function VideoItemFull({ data }) {
    const volumeBar = useRef();
    const videoRef = useRef();
    const progressBar = useRef();
    const animationRef = useRef();

    const {
        isPlaying,
        volume,
        isMuted,
        currentTime,
        duration,
        toggleMuted,
        handleAdjustVolume,
        changePlayerCurrentTime,
        togglePlayPause,
        changeRange,
        handlePlayVideo,
        handlePauseVideo,
        handleEffectTimeChange,
        calculateTime,
    } = useVideo(videoRef, progressBar, animationRef, volumeBar);
    const [hideArrowIcon, setHideArrowIcon] = useState(false);
    const [comments, setComments] = useState(null);
    const [comment, setComment] = useState(null);
    const { isLiked, likesCount, handleToggleLike } = useVideoActions(data);

    useEffect(() => {
        getComments(data?.id).then((res) => {
            setComments(res);
        });
    }, [data?.id, comment]);

    useEffect(() => {
        handleEffectTimeChange();
    }, [videoRef?.current?.loadedmetadata, videoRef?.current?.readyState, handleEffectTimeChange]);

    useEffect(() => {
        if (isMuted) {
            videoRef.current.volume = 0;
        } else {
            videoRef.current.volume = volume;
        }
    }, [isMuted, volume]);

    const ArrowClasses = cx('share-arrow', {
        hide: hideArrowIcon,
    });

    const handleCommentInput = (e) => {
        if (comment !== e.target.value) {
            setComment(e.target.value);
        } else {
            setComment('');
            e.target.value = '';
        }
    };

    const postComment = () => {
        postCommentService(data?.id, comment).then((res) => {
            handleCommentInput({ target: { value: '' } });
        });
    };

    return (
        <div className={cx('wrapper')}>
            <Link to={`/`} className={cx('close-btn')}>
                <XIcon />
            </Link>
            {/* video */}
            <div className={cx('video-wrapper')}>
                <div className={cx('video-card')}>
                    {/* video */}
                    <video
                        preload="metadata"
                        onTimeUpdate={changePlayerCurrentTime}
                        onEnded={handlePlayVideo}
                        src={data?.file_url}
                        ref={videoRef}
                    ></video>
                    {/* controls custom */}
                    <div className={cx('controls')}>
                        <div className={cx('play-pause')} onClick={togglePlayPause}>
                            {isPlaying ? <PLayIcon /> : <PauseIcon />}
                        </div>

                        <div className={cx('volume')}>
                            <div className={cx('change')}>
                                <input
                                    ref={volumeBar}
                                    className={cx('range')}
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={volume}
                                    onInput={handleAdjustVolume}
                                />
                            </div>

                            <div className={cx('mute')} onClick={toggleMuted}>
                                {isMuted ? (
                                    <MuteIcon className={cx('mute-icon')} />
                                ) : (
                                    <VolumeIcon className={cx('volume-icon')} />
                                )}
                            </div>
                        </div>

                        <div className={cx('progress-time')}>
                            <input
                                ref={progressBar}
                                type="range"
                                className={cx('range-bar')}
                                defaultValue="0"
                                onChange={changeRange}
                            />
                            <div className={cx('time')}>
                                <span>{calculateTime(currentTime)}</span>
                                <span>/{duration && !isNaN(duration) && calculateTime(duration)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* content and comment */}
            <div className={cx('content-wrapper')}>
                <div className={cx('comment-list-wrapper')}>
                    <div className={cx('profile-wrapper')}>
                        <div className={cx('desc-content-wrapper')}>
                            <div className={cx('info-wrapper')}>
                                <Image className={cx('avatar')} src={data?.user.avatar} alt="avatar" />
                                <div className={cx('name-container')}>
                                    <Link className={cx('username')} to={`/@${data?.user.nickname}`}>
                                        {data?.user.nickname}
                                        {data?.user.tick && (
                                            <FontAwesomeIcon className={cx('blue-tick-icon')} icon={faCheckCircle} />
                                        )}
                                    </Link>
                                    <p className={cx('name')}>
                                        {data?.user.first_name} {data?.user.last_name}
                                    </p>
                                </div>
                            </div>
                            <div className={cx('main-content-wrapper')}>
                                <div className={cx('caption-wrapper')}>{data?.description}</div>
                                <div className={cx('music-wrapper')}>
                                    {!data?.music || <MusicIcon className={cx('music-icon')} />}
                                    {data?.music}
                                </div>
                            </div>
                        </div>
                        <div className={cx('actions-wrapper')}>
                            {/* Video actions icons */}
                            <div className={cx('video-action-icons')}>
                                <button className={cx('btn-action-icon')} onClick={() => handleToggleLike()}>
                                    <span className={cx('cover-icon')}>
                                        {isLiked ? (
                                            <HeartVideoIcon className={cx('heart-active-icon')} />
                                        ) : (
                                            <HeartVideoIcon />
                                        )}
                                    </span>
                                    <strong className={cx('count-icon')}>{likesCount}</strong>
                                </button>
                                <button className={cx('btn-action-icon')}>
                                    <span className={cx('cover-icon')}>
                                        <OpenCommentIcon />
                                    </span>
                                    <strong className={cx('count-icon')}>{data?.comments_count}</strong>
                                </button>
                                <button className={cx('btn-action-icon')}>
                                    <span className={cx('cover-icon')}>
                                        <FavoriteVideoIcon />
                                    </span>
                                    <strong className={cx('count-icon')}>{data?.likes_count}</strong>
                                </button>
                                <Tippy
                                    delay={[800, 500]}
                                    offset={[-20, 5]}
                                    interactive
                                    placement="top-start"
                                    render={(attrs) => (
                                        <div className={cx('share-wrapper')} tabIndex="-1" {...attrs}>
                                            <PopperWrapper className={cx('share-popper')}>
                                                {hideArrowIcon ? renderAllItem() : render5FirstItem()}
                                                <Button
                                                    href="#"
                                                    className={ArrowClasses}
                                                    onClick={() => setHideArrowIcon(true)}
                                                >
                                                    {<ArrowDownIcon />}
                                                </Button>
                                            </PopperWrapper>
                                        </div>
                                    )}
                                    onHide={() => setHideArrowIcon(false)}
                                >
                                    <button className={cx('btn-action-icon')}>
                                        <span className={cx('cover-icon')}>
                                            <ShareIcon />
                                        </span>
                                        <strong className={cx('count-icon')}>{data?.shares_count}</strong>
                                    </button>
                                </Tippy>
                            </div>
                        </div>
                    </div>
                    <div className={cx('tab-menu-wrapper')}>
                        <div className={cx('tab-item')}>Comments &#40;{data?.comments_count}&#41;</div>
                    </div>
                    <div className={cx('comment-list-wrapper')}>
                        {comments?.length > 0
                            ? comments.map((comment, key) => (
                                  <div key={key} className={cx('comment-item-wrapper')}>
                                      <CommentItem comment={comment} />
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
                <div className={cx('bottom-comment-wrapper')}>
                    <input
                        className={cx('comment-input')}
                        placeholder="Write a comment..."
                        onChange={(e) => {
                            handleCommentInput(e);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                postComment();
                            }
                        }}
                    ></input>
                    <Button onClick={() => postComment()} className={cx('post-comment-btn')}>
                        Post
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default VideoItemFull;
