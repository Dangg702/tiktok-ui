import classNames from 'classnames/bind';
import { forwardRef, useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisplay } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import { UpToLineIcon, XIcon, PhoneIcon } from '~/components/Icons';
import styles from './ScrollToTop.module.scss';

const cx = classNames.bind(styles);

function ScrollToTop(props, ref) {
    const upToLineRef = useRef(null);
    const promotionBtnRef = useRef(null);
    const expandBtnRef = useRef(null);

    const [promotionHide, setPromotionHide] = useState(false);
    const [expandHide, setExpandHide] = useState(true);

    const promotionClasses = cx('promotion-btn', {
        hide: promotionHide,
    });
    const ExpandClasses = cx('expand-btn-container', {
        hide: expandHide,
    });

    const showOptions = () => {
        setPromotionHide(true);
        setExpandHide(false);
    };

    const handleCloseBtn = (e) => {
        setExpandHide(true);
        setPromotionHide(false);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleScroll = () => {
        if (window.scrollY > 99) {
            upToLineRef.current.style.display = 'flex';
        } else {
            upToLineRef.current.style.display = 'none';
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    return (
        <div className={cx('bottom-container')} ref={ref} {...props}>
            <div className={cx('promotion-container')}>
                <Button
                    ref={promotionBtnRef}
                    className={promotionClasses}
                    small
                    outlineGray
                    rounded
                    onClick={showOptions}
                >
                    Get app
                </Button>
                <div className={ExpandClasses} ref={expandBtnRef}>
                    <div className={cx('close-btn')} onClick={handleCloseBtn}>
                        <XIcon />
                    </div>
                    <div className={cx('expand-wrapper')}>
                        <div className={cx('item-wrapper')}>
                            <FontAwesomeIcon icon={faDisplay} className="icon" />
                            <span className={cx('item-content')}>Get TikTok for desktop</span>
                        </div>
                        <span className={cx('separate-line')}></span>
                        <div className={cx('item-wrapper')}>
                            <PhoneIcon />
                            <span className={cx('item-content')}>Get TikTok App</span>
                        </div>
                    </div>
                </div>
            </div>
            <Button ref={upToLineRef} className={cx('top-icon')} primary onClick={scrollToTop}>
                <UpToLineIcon />
            </Button>
        </div>
    );
}

export default forwardRef(ScrollToTop);
