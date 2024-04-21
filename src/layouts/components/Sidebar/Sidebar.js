import classNames from 'classnames/bind';
import { useContext, useState } from 'react';

import Menu, { MenuItem } from './Menu';
import config from '~/config/config';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    CompassIcon,
    CompassActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts/SuggestedAccounts';
import Footer from './Footer/Footer';
import Button from '~/components/Button/Button';
import { ModalContext } from '~/components/ModalContext';
import ModalCustom from '~/components/ModalCustom/ModalCustom';
import ModalItem from '~/components/ModalItem';
import { useModal } from '~/hooks';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const isLogin = localStorage.getItem('token');

    const modalContext = useContext(ModalContext);
    // const { openModal } = useModal();

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem to={config.routes.home} title="For You" icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    to={config.routes.following}
                    title="Following"
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem
                    to={config.routes.explore}
                    title="Explore"
                    icon={<CompassIcon />}
                    activeIcon={<CompassActiveIcon />}
                />
                <MenuItem to={config.routes.live} title="Live" icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>

            {/* Following account or Login */}
            {isLogin ? (
                <>
                    <SuggestedAccounts label="Following account" />
                </>
            ) : (
                <div className={cx('frame-container')}>
                    <p className={cx('login-content')}>Log in to follow creators, like videos, and view comments.</p>
                    <Button className={cx('login-btn')} outlinePrimary large onClick={() => modalContext.openModal()}>
                        Login
                    </Button>
                    <ModalCustom>
                        <div className={cx('modal-wrapper')}>
                            <ModalItem />
                        </div>
                    </ModalCustom>
                </div>
            )}

            {/* Sidebar Footer */}
            <Footer>
                <div className={cx('link-container')}>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        About
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        Newsroom
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        Contact
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        Careers
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        ByteDance
                    </a>
                </div>
                <div className={cx('link-container')}>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        TikTok for Good
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        Advertise
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        Developers
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        Transparency
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        TikTok Rewards
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        TikTok Embeds
                    </a>
                </div>
                <div className={cx('link-container')}>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        Help
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        Safety
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        Terms
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        Privacy
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        Creator Portal
                    </a>
                    <a className={cx('link-item')} href="https://www.tiktok.com/about" rel="noreferrer" target="_blank">
                        Community Guidelines
                    </a>
                </div>
                <span className={cx('copy-right')}>&copy; 2023 TikTok</span>
            </Footer>
        </aside>
    );
}

export default Sidebar;
