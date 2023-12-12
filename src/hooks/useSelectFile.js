import { useState } from 'react';

export default function useSelectFile(inputRef) {
    const [videoAsset, setVideoAsset] = useState();
    const [source, setSource] = useState();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const url = URL.createObjectURL(selectedFile);
        setVideoAsset(selectedFile);
        setSource(url);
        console.log('selectedFile', selectedFile);
        console.log('videoAsset', videoAsset);
        console.log('source', source);
    };

    const handleChoose = () => {
        inputRef.current.click();
    };
    return { videoAsset, source, handleFileChange, handleChoose };
}
