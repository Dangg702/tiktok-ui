import classNames from 'classnames/bind';
import { useContext, useRef, useEffect } from 'react';
import Modal from 'react-modal';

import Button from '~/components/Button';
import {
    HeartVideoIcon,
    LiveMobileIcon,
    MusicIcon,
    OpenCommentIcon,
    PauseRoundIcon,
    PlayRoundIcon,
    SearchIcon,
    ShareIcon,
    MuteIcon,
    VolumeIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import { useModal, useVideo } from '~/hooks';
import styles from './MockupPreview.module.scss';

const cx = classNames.bind(styles);

const customStyles = {
    content: {
        width: '310px',
        height: '236px',
        padding: '0',
        margin: 'auto',
        display: 'flex',
        borderRadius: '9px',
        border: '1px solid rgba(22, 24, 35, 0.03)',
        backgroundColor: 'var(--white)',
        overflow: 'none',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: '9999',
    },
};

function MockupPreview({ url, data, caption, fileName }) {
    const { modalIsOpen, openModal, closeModal } = useModal();
    const videoPreview = useRef();
    const progressBarPreview = useRef();
    const animationRef = useRef();
    const {
        isMuted,
        volume,
        isPlaying,
        currentTime,
        duration,
        calculateTime,
        toggleMuted,
        changePlayerCurrentTime,
        handlePlayVideo,
        handlePauseVideo,
        togglePlayPause,
        changeRange,
        handleEffectTimeChange,
    } = useVideo(videoPreview, progressBarPreview, animationRef);

    const handleChangeVideo = () => {
        openModal();
    };

    useEffect(() => {
        handleEffectTimeChange();
    }, [videoPreview?.current?.loadedmetadata, videoPreview?.current?.readyState, handleEffectTimeChange]);

    useEffect(() => {
        if (isMuted) {
            videoPreview.current.volume = 0;
        } else {
            videoPreview.current.volume = volume;
        }
    }, [isMuted, volume]);

    return (
        <div className={cx('preview')}>
            <div className={cx('preview-player')}>
                <div className={cx('app-frame')}>
                    <div className={cx('app-tab', 'fyp-tab')}></div>
                </div>

                <div className={cx('feed-page', 'show')}>
                    <div className={cx('video-player')}>
                        <div className={cx('video-container')}>
                            {url != null && (
                                <video
                                    ref={videoPreview}
                                    onTimeUpdate={changePlayerCurrentTime}
                                    onEnded={handlePauseVideo}
                                    className={cx('video-preview')}
                                    src={url}
                                    preload="metadata"
                                ></video>
                            )}
                        </div>
                        <div className={cx('video-overlay')}>
                            <div className={cx('head')}>
                                <LiveMobileIcon className={cx('live-icon')} width="18" height="18" />
                                <div className={cx('header-text')}>
                                    <span>Following</span>
                                    <span>For you</span>
                                </div>
                                <SearchIcon className={cx('search-icon')} width="18" height="19" />
                            </div>
                            <div className={cx('sessions-right')}>
                                <Image className={cx('avatar')} src="" alt="avatar" />
                                <div className={cx('actions-group')}>
                                    <HeartVideoIcon />
                                    <OpenCommentIcon />
                                    <ShareIcon />
                                </div>
                                <div className={cx('record')}></div>
                            </div>
                            <div className={cx('sessions-left')}>
                                <p className={cx('username')}>&#64;{data.nickname}</p>
                                <p className={cx('description')}>{caption}</p>
                                <p className={cx('music')}>
                                    <span>
                                        <MusicIcon className={cx('music-icon')} />
                                    </span>
                                    original song
                                </p>
                            </div>
                        </div>
                        <div className={cx('video-controls')}>
                            <div className={cx('controls-container')}>
                                <div className={cx('controls-operator')}>
                                    <div className={cx('play-info')}>
                                        <div className={cx('play-btn')} onClick={togglePlayPause}>
                                            {isPlaying ? <PauseRoundIcon /> : <PlayRoundIcon />}
                                        </div>
                                        <div className={cx('play-time')}>
                                            {calculateTime(currentTime)}
                                            <span> / {calculateTime(duration)}</span>
                                        </div>
                                    </div>
                                    <div className={cx('operations-btn')}>
                                        <div className={cx('volume-btn')} onClick={toggleMuted}>
                                            {isMuted ? (
                                                <MuteIcon width="18px" height="18px" />
                                            ) : (
                                                <VolumeIcon width="18px" height="18px" />
                                            )}
                                        </div>
                                        <div className={cx('full-screen-btn')}></div>
                                    </div>
                                </div>
                                <div className={cx('progress-bar-container')}>
                                    <input
                                        ref={progressBarPreview}
                                        type="range"
                                        className={cx('progress-bar')}
                                        defaultValue="0"
                                        onChange={changeRange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('change-video-btn', 'card')}>
                <div className={cx('file')}>
                    <img
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03Ljk5OTM1IDAuNjY2NjI2QzUuOTc0NDkgMC42NjY2MjYgNC4xNDAyNCAxLjQ4ODE3IDIuODEzOSAyLjgxNDUxQzEuNDg3NTYgNC4xNDA4NSAwLjY2NjAxNiA1Ljk3NTEgMC42NjYwMTYgNy45OTk5NkMwLjY2NjAxNiAxMC4wMjQ4IDEuNDg3NTYgMTEuODU5MSAyLjgxMzkgMTMuMTg1NEM0LjE0MDI0IDE0LjUxMTggNS45NzQ0OSAxNS4zMzMzIDcuOTk5MzUgMTUuMzMzM0MxMC4wMjQyIDE1LjMzMzMgMTEuODU4NSAxNC41MTE4IDEzLjE4NDggMTMuMTg1NEMxNC41MTExIDExLjg1OTEgMTUuMzMyNyAxMC4wMjQ4IDE1LjMzMjcgNy45OTk5NkMxNS4zMzI3IDUuOTc1MSAxNC41MTExIDQuMTQwODUgMTMuMTg0OCAyLjgxNDUxQzExLjg1ODUgMS40ODgxNyAxMC4wMjQyIDAuNjY2NjI2IDcuOTk5MzUgMC42NjY2MjZaTTMuNzU2NzEgMy43NTczMkM0Ljg0MzIyIDIuNjcwOCA2LjM0MjMxIDEuOTk5OTYgNy45OTkzNSAxLjk5OTk2QzkuNjU2MzkgMS45OTk5NiAxMS4xNTU1IDIuNjcwOCAxMi4yNDIgMy43NTczMkMxMy4zMjg1IDQuODQzODMgMTMuOTk5MyA2LjM0MjkyIDEzLjk5OTMgNy45OTk5NkMxMy45OTkzIDkuNjU3IDEzLjMyODUgMTEuMTU2MSAxMi4yNDIgMTIuMjQyNkMxMS4xNTU1IDEzLjMyOTEgOS42NTYzOSAxNCA3Ljk5OTM1IDE0QzYuMzQyMzEgMTQgNC44NDMyMiAxMy4zMjkxIDMuNzU2NzEgMTIuMjQyNkMyLjY3MDE5IDExLjE1NjEgMS45OTkzNSA5LjY1NyAxLjk5OTM1IDcuOTk5OTZDMS45OTkzNSA2LjM0MjkyIDIuNjcwMTkgNC44NDM4MyAzLjc1NjcxIDMuNzU3MzJaTTEwLjk0ODQgNi43MTQ5NkMxMS4wMTYzIDYuNjQ2MTUgMTEuMDE2MyA2LjUzNDU5IDEwLjk0ODQgNi40NjU3OEwxMC4yMTAyIDUuNzE4MjNDMTAuMTQyMyA1LjY0OTQyIDEwLjAzMjEgNS42NDk0MiA5Ljk2NDE3IDUuNzE4MjNMNy4zMDM0IDguNDEyODJMNi4wMzQ1MyA3LjEyNzgyQzUuOTY2NTggNy4wNTkwMSA1Ljg1NjQyIDcuMDU5MDEgNS43ODg0NyA3LjEyNzgyTDUuMDUwMzEgNy44NzUzN0M0Ljk4MjM2IDcuOTQ0MTggNC45ODIzNiA4LjA1NTc0IDUuMDUwMzEgOC4xMjQ1NUw3LjE4MDM3IDEwLjI4MTdDNy4yNDgzMiAxMC4zNTA1IDcuMzU4NDggMTAuMzUwNSA3LjQyNjQzIDEwLjI4MTdMMTAuOTQ4NCA2LjcxNDk2WiIgZmlsbD0iIzE2MTgyMyIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+Cjwvc3ZnPgo="
                        className={cx('file-icon')}
                        alt="file-icon"
                    />
                    <div className={cx('file-name')}>{fileName}</div>
                </div>
                <Button className={cx('change-btn')} onClick={handleChangeVideo}>
                    Change video
                </Button>
                <Modal
                    id="modal-change-video"
                    closeTimeoutMS={500}
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    appElement={document.getElementById('root')}
                >
                    <div className={cx('modal-wrapper')}>
                        <div className={cx('modal-title-container')}>
                            <div className={cx('modal-title')}>Replace this video?</div>
                            <div className={cx('modal-subtitle')}>Caption and video settings will still be saved.</div>
                        </div>
                        <div className={cx('modal-btn', 'emphasis')}>Replace</div>
                        <div className={cx('modal-btn')} onClick={() => closeModal()}>
                            Continue editing
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default MockupPreview;
