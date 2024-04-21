import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';

import { HidePassWordIcon, ShowPassWordIcon } from '~/components/Icons';
import styles from '../Form.module.scss';
import Button from '~/components/Button/Button';
import Profile from '~/pages/Profile/Profile';
import { useLogin } from '~/hooks';

const cx = classNames.bind(styles);

function LoginWithUsername() {
    const { error, login } = useLogin();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [isError, setIsError] = useState(false);

    const hasSpace = password.includes(' ');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsError(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
        if (error !== null) {
            setIsError(true);
        }
    };

    useEffect(() => {
        if (username !== '' && password !== '' && !hasSpace && !username.startsWith(' ')) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [username, password, hasSpace]);

    return (
        <form className={cx('form')} onSubmit={handleSubmit}>
            <div className={cx('label')}>
                <span>Email or username</span>
                <button className={cx('btn')}>Login with phone</button>
            </div>
            <div className={cx('input-group')}>
                <input
                    className={cx('username')}
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Email or username"
                />
            </div>
            <div className={cx('input-group')}>
                <input
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
            <div className={cx('error', { hide: !isError })}>{error}</div>

            <a className={cx('forgot-password')} href="/">
                Forgot password?
            </a>
            <Button className={cx('btn-login')} disabled={disabled} primary>
                Log in
            </Button>
        </form>
    );
}

export default LoginWithUsername;
