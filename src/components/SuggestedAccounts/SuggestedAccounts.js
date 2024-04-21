import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { useEffect } from 'react';
import * as followService from '~/services/followService';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const [page, setPage] = useState(1);
    const [following, setFollowing] = useState([]);
    const [isHide, setIsHide] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await followService.followList(page);
            // if (result.length >= 20) {
            //     setIsHide(true);
            // }
            result && setFollowing(result);
        };

        fetchApi();
    }, [page]);

    const handleSeeMore = () => {
        setPage(page + 1);
    };
    const classnames = cx({
        'more-btn': true,
        hide: isHide,
    });

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {following.map((item) => (
                <AccountItem key={item.id} item={item} />
            ))}
            <p className={classnames}>See more</p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
