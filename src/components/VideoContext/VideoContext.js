import { createContext, useState, useEffect } from 'react';

const VideoContext = createContext();

function VideoProvider({ children }) {
    const [volume, setVolume] = useState(0.5);
    const [prevVolume, setPrevVolume] = useState(volume);
    const [isMuted, setIsMuted] = useState(true);

    const handleAdjustVolume = (e) => {
        const currentVolume = e.target.value;
        setVolume(currentVolume);
        currentVolume === '0' ? setIsMuted(true) : setIsMuted(false);
    };

    const toggleMuted = () => {
        if (isMuted) {
            setVolume(prevVolume);
            setIsMuted(false);
        } else {
            setPrevVolume(volume);
            setVolume(0);
            setIsMuted(true);
        }
    };

    const value = {
        volume,
        isMuted,
        toggleMuted,
        handleAdjustVolume,
    };

    return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}

export { VideoContext, VideoProvider };
