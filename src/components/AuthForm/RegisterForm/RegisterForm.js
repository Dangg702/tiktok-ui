import classNames from 'classnames/bind';

import styles from '../Form.module.scss';

import { useEffect, useState, useContext } from 'react';
import { HidePassWordIcon, ShowPassWordIcon } from '~/components/Icons';
import Button from '~/components/Button/Button';
import { LoginContext } from '~/components/LoginContext';
import * as AuthService from '~/services/authService';
import { ModalContext } from '~/components/ModalContext';
import CheckboxElement from '~/components/CheckboxElement';
const cx = classNames.bind(styles);
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 121 }, (_, i) => i + 1900);

function RegisterForm() {
    const loginContext = useContext(LoginContext);
    const [month, setMonth] = useState('Month');
    const [day, setDay] = useState('Day');
    const [year, setYear] = useState('Year');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const hasSpace = password.includes(' ');
    const modalContext = useContext(ModalContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await AuthService.register('email', username, password);
        setUsername('');
        setPassword('');
        setPasswordConfirm('');
        setIsChecked(false);
        modalContext.handleChangeForm('loginForm');
    };

    useEffect(() => {
        if (
            username !== '' &&
            password !== '' &&
            !hasSpace &&
            !username.startsWith(' ') &&
            password === passwordConfirm &&
            isChecked
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [username, password, hasSpace, isChecked, passwordConfirm]);
    return (
        <div style={{ width: '375px', height: '265px', margin: 'auto' }}>
            <h2 className={cx('title')}>Sign up</h2>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('label')}>
                    <span>When's your birthday?</span>
                </div>
                <div className={cx('input-group', 'select-box')}>
                    <select>
                        {/* <option value="0">Month</option> */}
                        {months.map((month, index) => (
                            <option
                                key={index}
                                value={month}
                                className={cx('option-item')}
                                onChange={(e) => setMonth(e.target.value)}
                            >
                                {month}
                            </option>
                        ))}
                    </select>
                    <select className={cx('select-box')}>
                        {days.map((day, index) => (
                            <option key={index} value={day} onChange={(e) => setDay(e.target.value)}>
                                {day}
                            </option>
                        ))}
                    </select>
                    <select className={cx('select-box')}>
                        {years.map((year, index) => (
                            <option key={index} value={year} onChange={(e) => setYear(e.target.value)}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={cx('label')}>
                    <span>Email</span>
                    <button className={cx('btn')}>Sing up with phone</button>
                </div>
                <div className={cx('input-group')}>
                    <input
                        className={cx('username')}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Email address"
                    />
                </div>
                <div className={cx('input-group')}>
                    <input
                        className={cx('password')}
                        type={isShowPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                <div className={cx('input-group')}>
                    <input
                        className={cx('password')}
                        type={isShowPasswordConfirm ? 'text' : 'password'}
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        placeholder="Confirm password"
                    />
                    <div
                        className={cx('eye-icon')}
                        onClick={() => {
                            setIsShowPasswordConfirm(!isShowPasswordConfirm);
                        }}
                    >
                        {!isShowPasswordConfirm ? <HidePassWordIcon /> : <ShowPassWordIcon />}
                    </div>
                </div>
                <div className={cx('input-group')}>
                    <CheckboxElement
                        checked={isChecked}
                        id="email-consent"
                        name="email-consent"
                        onChange={() => setIsChecked(!isChecked)}
                        label="Get trending content, newsletters, promotions, recommendations, and account updates sent to your
                        email"
                        width="36px"
                        height="22px"
                        textSize="1.2rem"
                    />
                </div>
                <Button className={cx('btn-login')} disabled={disabled} primary>
                    Sign up
                </Button>
            </form>
        </div>
    );
}

export default RegisterForm;
