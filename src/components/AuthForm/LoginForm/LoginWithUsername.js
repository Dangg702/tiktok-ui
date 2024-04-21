import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';

import { HidePassWordIcon, ShowPassWordIcon } from '~/components/Icons';
import styles from '../Form.module.scss';
import Button from '~/components/Button/Button';
import { LoginContext } from '~/components/LoginContext';
import { ModalContext } from '~/components/ModalContext';

const cx = classNames.bind(styles);

function LoginWithUsername() {
    const contextLogin = useContext(LoginContext);
    const modalContext = useContext(ModalContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [isError, setIsError] = useState(false);

    const hasSpace = password.includes(' ');
    const pattern = /\S/;

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsError(false);
    };
    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
        setIsError(false);
    };

    const handleSubmit = () => {
        contextLogin.fetchApi(username, password);
        modalContext.closeModal();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !hasSpace && pattern.test(username) && pattern.test(password)) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
            handleSubmit();
        }
    };

    useEffect(() => {
        if (!hasSpace && pattern.test(username) && pattern.test(password)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, password, hasSpace]);

    return (
        <form className={cx('form')}>
            <div className={cx('label')}>
                <span>Email or username</span>
                <button className={cx('btn')}>Login with phone</button>
            </div>
            <div className={cx('input-group')}>
                <input
                    onKeyDown={handleKeyPress}
                    className={cx('username')}
                    name="username"
                    value={username}
                    onChange={handleChangeUsername}
                    placeholder="Email or username"
                />
            </div>
            <div className={cx('input-group')}>
                <input
                    onKeyDown={handleKeyPress}
                    className={cx('password', { error: isError })}
                    name="password"
                    type={isShowPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                />
                <div
                    className={cx('eye-icon')}
                    onClick={() => {
                        setIsShowPassword(!isShowPassword);
                    }}
                >
                    {!isShowPassword ? <HidePassWordIcon /> : <ShowPassWordIcon />}
                </div>
            </div>
            <div className={cx('error', { hide: !isError })}>{contextLogin.error}</div>

            <a className={cx('forgot-password')} href="/">
                Forgot password?
            </a>
            <Button onClick={() => handleSubmit()} className={cx('btn-login')} disabled={disabled} primary>
                Log in
            </Button>
        </form>
    );
}

export default LoginWithUsername;
