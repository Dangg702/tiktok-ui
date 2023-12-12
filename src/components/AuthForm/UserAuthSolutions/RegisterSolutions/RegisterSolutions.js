import classNames from 'classnames/bind';
import { useContext } from 'react';
import { ModalContext } from '~/components/ModalContext';
import Button from '~/components/Button/Button';
import { FacebookIcon, GoogleIcon, KakaoTalkIcon, LineIcon, TwitterIcon, UserIcon } from '~/components/Icons';
import styles from '../UserAuthSolutions.module.scss';

const cx = classNames.bind(styles);

const registerListSolutions = {
    title: 'Sign up for TikTok',
    contents: [
        {
            id: 1,
            icon: <UserIcon />,
            title: 'Use phone or email',
        },
        {
            id: 2,
            icon: <FacebookIcon />,
            title: 'Continue with Facebook',
            disabled: true,
        },
        {
            id: 3,
            icon: <GoogleIcon />,
            title: 'Continue with Google',
            disabled: true,
        },
        {
            id: 4,
            icon: <TwitterIcon />,
            title: 'Continue with Twitter',
            disabled: true,
        },
        {
            id: 5,
            icon: <LineIcon />,
            title: 'Continue with LINE',
            disabled: true,
        },
        {
            id: 6,
            icon: <KakaoTalkIcon />,
            title: 'Continue with KakaoTalk',
            disabled: true,
        },
    ],
};

function RegisterSolutions() {
    const modalContext = useContext(ModalContext);
    const handleSwitchForm = (id) => {
        if (id === 1) {
            modalContext.handleChangeForm('registerForm');
        }
    };
    return (
        <div style={{ width: '375px', height: '265px', margin: 'auto' }}>
            <h2 className={cx('title')}>{registerListSolutions.title}</h2>
            {registerListSolutions.contents.map((item) => (
                <Button className={cx('solution')} key={item.id} outlineGray onClick={() => handleSwitchForm(item.id)}>
                    <span className={cx('icon')}>{item.icon}</span>
                    <span className={cx('desc')}>{item.title}</span>
                </Button>
            ))}
        </div>
    );
}

export default RegisterSolutions;
