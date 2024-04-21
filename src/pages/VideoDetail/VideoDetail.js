import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import VideoItemFull from '~/components/VideoItemFull';
import * as getVideosService from '~/services/getVideosService';
import styles from './VideoDetail.module.scss';

const cx = classNames.bind(styles);

function VideoDetail() {
    const { uuid } = useParams();
    const [videoData, setVideoData] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getVideosService.getVideo(uuid);
            if (result) {
                setVideoData(result);
            }
        };
        fetchApi();
    }, [uuid]);

    return (
        <div className={cx('main-content-wrapper')}>
            <VideoItemFull data={videoData} />
        </div>
    );
}

export default VideoDetail;
