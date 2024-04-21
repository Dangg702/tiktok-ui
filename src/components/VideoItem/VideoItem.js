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
    MuteIcon,
    OpenCommentIcon,
    PLayIcon,
    PauseIcon,
    ShareIcon,
    VolumeIcon,
} from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { VideoContext } from '~/components/VideoContext';
import { render5FirstItem, renderAllItem } from './ShareList';
import * as getVideosService from '~/services/getVideosService';
import * as likeServices from '~/services/likeServices';
import { useVideo, useVideoActions } from '~/hooks';
import styles from './VideoItem.module.scss';

const cx = classNames.bind(styles);

function VideoItem({ data }) {
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
    const { isLiked, likesCount, handleToggleLike } = useVideoActions(data);

    const [elementIsVisible, setElementIsVisible] = useState(false);
    const [hideArrowIcon, setHideArrowIcon] = useState(false);

    // auto play video when scrolled to view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setElementIsVisible(entry.isIntersecting);
            },
            { threshold: 0.4 },
        );
        observer.observe(videoRef.current);

        if (elementIsVisible && videoRef.current) {
            videoRef.current.currentTime = 0;
            handlePlayVideo();
        } else if (!elementIsVisible && videoRef.current) {
            videoRef.current.value = 0;
            handlePauseVideo();
        }
    }, [elementIsVisible]);

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

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const result = await getVideosService.getVideo(data.id);
    //         // if (result) {

    //         // }
    //     };
    //     fetchApi();
    // }, [])

    const ArrowClasses = cx('share-arrow', {
        hide: hideArrowIcon,
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-card')}>
                {/* video */}
                <Link to={`/videos/${data.uuid}`}>
                    <video
                        preload="metadata"
                        onTimeUpdate={changePlayerCurrentTime}
                        onEnded={handlePlayVideo}
                        src={data.file_url}
                        ref={videoRef}
                    ></video>
                </Link>
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
                {/* Report top right */}
                <p className={cx('report')}>
                    <FlagIcon className={cx('report-icon')} />
                    Report
                </p>
            </div>
            {/* Video actions icons */}
            <div className={cx('video-action-icons')}>
                <button className={cx('btn-action-icon')} onClick={handleToggleLike}>
                    <span className={cx('cover-icon')}>
                        {isLiked ? <HeartVideoIcon className={cx('heart-active-icon')} /> : <HeartVideoIcon />}
                    </span>
                    <strong className={cx('count-icon')}>{likesCount}</strong>
                </button>
                <Link to={`/videos/${data.uuid}`} className={cx('btn-action-icon')}>
                    <span className={cx('cover-icon')}>
                        <OpenCommentIcon />
                    </span>
                    <strong className={cx('count-icon')}>{data.comments_count}</strong>
                </Link>
                <button className={cx('btn-action-icon')}>
                    <span className={cx('cover-icon')}>
                        <FavoriteVideoIcon />
                    </span>
                    <strong className={cx('count-icon')}>{data.likes_count}</strong>
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
                                <Button href="#" className={ArrowClasses} onClick={() => setHideArrowIcon(true)}>
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
                        <strong className={cx('count-icon')}>{data.shares_count}</strong>
                    </button>
                </Tippy>
            </div>
        </div>
    );
}
export default VideoItem;
