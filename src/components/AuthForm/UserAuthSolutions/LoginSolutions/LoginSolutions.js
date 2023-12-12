import classNames from 'classnames/bind';
import { useContext } from 'react';

import {
    ORIcon,
    UserIcon,
    FacebookIcon,
    GoogleIcon,
    TwitterIcon,
    LineIcon,
    KakaoTalkIcon,
    AppleIcon,
    InsIcon,
} from '~/components/Icons';
import styles from '../UserAuthSolutions.module.scss';
import Button from '~/components/Button/Button';
import { ModalContext } from '~/components/ModalContext';

const cx = classNames.bind(styles);

const loginListSolutions = {
    title: 'Log in to TikTok',
    contents: [
        {
            id: 1,
            icon: <ORIcon />,
            title: 'Use QR code',
            disabled: true,
        },
        {
            id: 2,
            icon: <UserIcon />,
            title: 'Use phone / email / username',
        },
        {
            id: 3,
            icon: <FacebookIcon />,
            title: 'Continue with Facebook',
            disabled: true,
        },
        {
            id: 4,
            icon: <GoogleIcon />,
            title: 'Continue with Google',
            disabled: true,
        },
        {
            id: 5,
            icon: <TwitterIcon />,
            title: 'Continue with Twitter',
            disabled: true,
        },
        {
            id: 6,
            icon: <LineIcon />,
            title: 'Continue with LINE',
            disabled: true,
        },
        {
            id: 7,
            icon: <KakaoTalkIcon />,
            title: 'Continue with KakaoTalk',
            disabled: true,
        },
        {
            id: 8,
            icon: <AppleIcon />,
            title: 'Continue with Apple',
            disabled: true,
        },
        {
            id: 9,
            icon: <InsIcon />,
            title: 'Continue with Instagram',
            disabled: true,
        },
    ],
};

function LoginSolutions() {
    const modalContext = useContext(ModalContext);
    const handleSwitchForm = (id) => {
        if (id === 2) {
            modalContext.handleChangeForm('loginForm');
        }
    };
    return (
        <div style={{ width: '375px', height: '265px', margin: 'auto' }}>
            {/* Solutions login/register*/}
            <h2 className={cx('title')}>{loginListSolutions.title}</h2>
            {loginListSolutions.contents.map((item) => (
                <Button
                    outlineGray
                    className={cx('solution')}
                    key={item.id}
                    disabled={item.disabled}
                    onClick={() => handleSwitchForm(item.id)}
                >
                    <span className={cx('icon')}>{item.icon}</span>
                    <span className={cx('desc')}>{item.title}</span>
                </Button>
            ))}
        </div>
    );
}

export default LoginSolutions;
