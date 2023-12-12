import classNames from 'classnames/bind';
import { useState, forwardRef } from 'react';
import styles from './SwitchElement.module.scss';
const cx = classNames.bind(styles);

function SwitchElement({ title, icon, isChecked, onClick }) {
    return (
        <div className={cx('container')}>
            <span className={cx('title')}>{title}</span>
            <span className={cx('icon')}>{icon}</span>
            <div className={cx('switch', { isChecked: isChecked })} onClick={onClick}>
                <div className={cx('switch-wrapper')}>
                    <div className={cx('switch-inner')}></div>
                </div>
            </div>
        </div>
    );
}

export default SwitchElement;
