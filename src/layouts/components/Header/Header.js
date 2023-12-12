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
import ModalItem from '~/components/ModalItem';
import ModalCustom from '~/components/ModalCustom/ModalCustom';
import * as getUserService from '~/services/getUserService';
import { useLogin, useModal, useGetUser } from '~/hooks';
import styles from './Header.module.scss';

// bind ràng buộc theo styles đã import --> trả về func
// classNames giúp viết được tên class có chứa dấu -
const cx = classNames.bind(styles);

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
        to: '/@',
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

function Header() {
    // const isLogin = useState(localStorage.getItem('token') !== null);
    const modalContext = useContext(ModalContext);
    // const { modalIsOpen, typeForm, openModal, closeModal, handleChangeForm } = useModal();

    // const [data, setData] = useState({});

    const { isLogin } = useLogin();
    const { getCurrentUser, userData } = useGetUser();

    const handleMenuItem = (menuItem) => {
        // console.log(menuItem);
    };

    useEffect(() => {
        !userData && getCurrentUser();
    }, [userData]);

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
                    {isLogin ? (
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
                            <Button primary onClick={modalContext.openModal}>
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
                    <Menu items={isLogin ? userMenu : MENU_ITEMS} onChange={handleMenuItem}>
                        {isLogin ? (
                            <Image
                                className={cx('user-avatar')}
                                src={userData && userData.avatar}
                                alt={userData && userData.nickname}
                                // fallback="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/287579c9b915bc18cebe08262d777592~c5_100x100.jpeg?x-expires=1688367600&x-signature=97NxPiS%2Fx0h%2BCPPaktFYyGnu%2FlQ%3D"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
