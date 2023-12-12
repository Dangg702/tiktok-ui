import classNames from 'classnames/bind';
import { useRef } from 'react';
import styles from './UploadFile.module.scss';
import { UploadIcon } from '~/components/Icons';
import Button from '~/components/Button/Button';
import { useSelectFile } from '~/hooks';

const cx = classNames.bind(styles);

function UploadFile() {
    const inputRef = useRef();
    const { handleFileChange, handleChoose } = useSelectFile(inputRef);

    return (
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
            <input ref={inputRef} type="file" accept="video/*" hidden onChange={(e) => handleFileChange(e)} />
        </div>
    );
}

export default UploadFile;
