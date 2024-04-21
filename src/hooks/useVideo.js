import { useState } from 'react';
import * as likeServices from '~/services/likeServices';

export default function useVideo(videoRef, progressBar, animationRef, volumeBar) {
    const [volume, setVolume] = useState(0.5);
    const [prevVolume, setPrevVolume] = useState(volume);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // play/pause
    const handlePlayVideo = () => {
        const video = videoRef.current;
        const playPromise = video.play();

        setIsPlaying(true);
        setIsMuted(false);
        // //  prevent "The play() request was interrupted by a call to pause()" error
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    animationRef.current = requestAnimationFrame(whilePlaying);
                    video.play();
                })
                .catch(() => {
                    video.pause();
                });
        }
        animationRef.current = requestAnimationFrame(whilePlaying);
    };
    const handlePauseVideo = () => {
        setIsPlaying(false);
        videoRef.current.pause();
        cancelAnimationFrame(animationRef.current);
    };
    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            handlePlayVideo();
            isMuted ? setIsMuted(true) : setIsMuted(false);
        } else {
            handlePauseVideo();
        }
    };
    // video progress bar handle
    const whilePlaying = () => {
        if (videoRef.current && videoRef.current.currentTime) {
            progressBar.current.value = videoRef.current.currentTime;
            changePlayerCurrentTime();
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
    };
    const changeRange = () => {
        videoRef.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    };
    const changePlayerCurrentTime = () => {
        const currentValue = Number(videoRef.current.currentTime);
        const duration = videoRef.current.duration;
        progressBar.current.style.setProperty('--seek-before-width', `${(currentValue / duration) * 100}%`);
        setCurrentTime(currentValue);
    };

    // volume
    const handleAdjustVolume = () => {
        if (volumeBar.current.value === '0') {
            setVolume(0);
            setIsMuted(true);
        } else {
            setVolume(volumeBar.current.value);
            setIsMuted(false);
        }
        volumeBar.current.style.setProperty('--seek-before-percent', `${volumeBar.current.value * 100}%`);
    };
    const toggleMuted = () => {
        if (isMuted && prevVolume !== 0) {
            setVolume(prevVolume);
            setIsMuted(false);
            volumeBar && volumeBar.current.style.setProperty('--seek-before-percent', `${prevVolume * 100}%`);
        } else {
            setPrevVolume(volume);
            setVolume(0);
            setIsMuted(true);
            volumeBar && volumeBar.current.style.setProperty('--seek-before-percent', `0%`);
        }
    };
    const handleChangeVolume = () => {
        videoRef.current.volume = volumeBar.current.value;
        handleAdjustVolume();
    };

    // handle effect time change
    const handleEffectTimeChange = () => {
        const seconds = Math.floor(videoRef.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
        progressBar.current.value = videoRef.current.currentTime;
    };

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnMinutes}:${returnSeconds}`;
    };

    return {
        isPlaying,
        volume,
        isMuted,
        currentTime,
        duration,
        toggleMuted,
        handleAdjustVolume,
        changePlayerCurrentTime,
        handleChangeVolume,
        togglePlayPause,
        changeRange,
        handlePlayVideo,
        handlePauseVideo,
        handleEffectTimeChange,
        whilePlaying,
        calculateTime,
    };
}
