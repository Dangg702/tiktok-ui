import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';

import ScrollToTop from '~/components/ScrollToTop';
import Content from '~/layouts/components/Content/Content';
import * as getVideosService from '~/services/getVideosService';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const [contentData, setContentData] = useState([]);
    const [page, setPage] = useState(1);

    const bottomRef = useRef(null);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getVideosService.getListVideos('for-you', page);
            setContentData((prev) => [...prev, ...result]);
        };

        fetchApi();
    }, [page]);

    function handleScroll() {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
            setPage((page) => page + 1);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    return (
        <div className={cx('main-content-wrapper')}>
            <Content data={contentData} />
            {/* bottom container */}
            <ScrollToTop ref={bottomRef} />
        </div>
    );
}

export default Home;
