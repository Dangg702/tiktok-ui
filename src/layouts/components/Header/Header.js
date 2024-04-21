import {
    faBookmark,
    faCircleQuestion,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faPlus,
    faRightToBracket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import config from '~/config';
import images from '~/assets/images';
import Button from '~/components/Button';
import { InboxIcon, MessageIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import { ModalContext } from '~/components/ModalContext';
import { LoginContext } from '~/components/LoginContext';
import ModalItem from '~/components/ModalItem';
import ModalCustom from '~/components/ModalCustom/ModalCustom';
import * as getUserService from '~/services/getUserService';
import styles from './Header.module.scss';

// bind ràng buộc theo styles đã import --> trả về func
// classNames giúp viết được tên class có chứa dấu -
const cx = classNames.bind(styles);

function Header() {
    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);
    const username = contextLogin.data ? contextLogin.data.nickname : '';
    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'English',
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'language',
                        code: 'vi',
                        title: 'Tiếng Việt',
                    },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Feedback and help',
            to: '/feedback',
        },
        {
            icon: <FontAwesomeIcon icon={faKeyboard} />,
            title: 'Keyboard shortcuts',
        },
    ];

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: `/@${username}`,
        },
        {
            icon: <FontAwesomeIcon icon={faBookmark} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faRightToBracket} />,
            title: 'Log out',
            separate: true,
            to: '/',
        },
    ];

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                //Handle Change Language
                break;
            default:
        }
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Tiktok logo" />
                </Link>
                {/* Search box */}
                <Search />
                {/* Actions */}
                <div className={cx('actions')}>
                    {contextLogin.data ? (
                        <>
                            <Button
                                to={config.routes.upload}
                                className={cx('upload-btn')}
                                outlineGray
                                small
                                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            >
                                Upload
                            </Button>
                            <Tippy delay={[0, 100]} content="Messages" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 100]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('baddge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button to={config.routes.upload} outlineGray leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Upload
                            </Button>
                            <Button primary onClick={() => contextModal.openModal()}>
                                Login
                            </Button>
                            <ModalCustom>
                                <div className={cx('modal-wrapper')}>
                                    <ModalItem />
                                </div>
                            </ModalCustom>
                        </>
                    )}
                    {/* User Menu */}
                    {contextLogin.data && (
                        <Menu items={userMenu} onChange={handleMenuChange}>
                            <Image
                                className={cx('user-avatar')}
                                src={contextLogin.data.avatar}
                                alt={contextLogin.data.nickname}
                            />
                        </Menu>
                    )}
                    {!contextLogin.data && (
                        <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </Menu>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
