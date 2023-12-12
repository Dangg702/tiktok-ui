import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './SuggestedAccounts.module.scss';
import Image from '../Image/Image';

const cx = classNames.bind(styles);
function AccountItem({ item }) {
    return (
        <div className={cx('account-item')}>
            <Image className={cx('avatar')} src={item.avatar} alt="avatar" />
            <div className={cx('item-info')}>
                <p className={cx('username')}>
                    <strong>{item.nickname}</strong>
                    {item.tick && <FontAwesomeIcon className={cx('blue-tick-icon')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>
                    ${item.first_name} ${item.last_name}
                </p>
            </div>
        </div>
    );
}

AccountItem.prototype = {};

export default AccountItem;
