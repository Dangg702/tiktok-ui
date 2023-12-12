import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import { UploadIcon } from '~/components/Icons';
import Button from '~/components/Button/Button';
import Footer from '~/layouts/components/Footer';
import UploadPreview from '~/components/UploadPreview';
import { useState, useRef, useEffect } from 'react';
import { useGetUser } from '~/hooks';

const cx = classNames.bind(styles);

function Upload() {
    const inputRef = useRef();
    const [videoAsset, setVideoAsset] = useState(null);
    const { getCurrentUser, userData } = useGetUser();
    // const [source, setSource] = useState();
    // console.log('upload data', userData);
    useEffect(() => {
        !userData && getCurrentUser();
    }, [userData]);

    const clearFile = () => {
        setVideoAsset(null);
    };

    const handleFileChange = (e) => {
        const reader = new FileReader();
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
            setVideoAsset(selectedFile);
        }
        // reader.onload = (readerEvent) => {
        //     if (selectedFile.type.includes('video')) {
        //         setVideoAsset(readerEvent.target.result);
        //     }
        // };
    };

    const handleChoose = (e) => {
        inputRef.current.click();
    };

    const handleUploadVideo = (e) => {
        // api
    };

    return (
        <>
            <div className={cx('wrapper')}>
                {videoAsset ? (
                    // Upload Preview
                    <UploadPreview file={videoAsset} userData={userData} />
                ) : (
                    <div className={cx('container')}>
                        <div className={cx('uploader')}>
                            <div className={cx('upload-card')} onClick={handleChoose}>
                                <UploadIcon className={cx('upload-icon')} />
                                <div className={cx('title')}>Select video to upload</div>
                                <div className={cx('subtitle')}>
                                    <p>Or drag and drop a file</p>
                                    <p>Long videos can be split into multiple parts to get more exposure</p>
                                </div>
                                <div className={cx('video-info')}>
                                    <p className={cx('description')}>MP4 or WebM</p>
                                    <p className={cx('description')}>720x1280 resolution or higher</p>
                                    <p className={cx('description')}>Up to 30 minutes</p>
                                    <p className={cx('description')}>Less than 2 GB</p>
                                </div>
                                <Button className={cx('upload-btn')} primary>
                                    Select file
                                </Button>
                            </div>
                            <input ref={inputRef} type="file" accept="video/*" hidden onChange={handleFileChange} />
                        </div>
                    </div>
                )}
            </div>
            {/* // Footer */}
            <Footer />
        </>
    );
}

export default Upload;
