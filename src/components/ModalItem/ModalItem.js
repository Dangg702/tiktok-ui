import classNames from 'classnames/bind';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { ModalContext } from '~/components/ModalContext';
import { XIcon } from '~/components/Icons';
import LoginSolutions from '~/components/AuthForm/UserAuthSolutions/LoginSolutions';
import RegisterSolutions from '~/components/AuthForm/UserAuthSolutions/RegisterSolutions';
import LoginForm from '~/components/AuthForm/LoginForm';
import RegisterForm from '../AuthForm/RegisterForm';

import styles from './ModalItem.module.scss';

const cx = classNames.bind(styles);

function ModalItem() {
    const modalContext = useContext(ModalContext);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('modal-content')}>
                {modalContext.typeForm === 'loginForm' && (
                    <span className={cx('back-icon')} onClick={() => modalContext.handleChangeForm('login')}>
                        <FontAwesomeIcon icon={faChevronLeft} className="fa-lg" />
                    </span>
                )}

                {modalContext.typeForm === 'registerForm' && (
                    <span className={cx('back-icon')} onClick={() => modalContext.handleChangeForm('register')}>
                        <FontAwesomeIcon icon={faChevronLeft} className="fa-lg" />
                    </span>
                )}

                <div className={cx('inner')}>
                    {modalContext.typeForm === 'login' && <LoginSolutions />}
                    {modalContext.typeForm === 'register' && <RegisterSolutions />}
                    {modalContext.typeForm === 'loginForm' && <LoginForm />}
                    {modalContext.typeForm === 'registerForm' && <RegisterForm />}
                </div>

                <div className={cx('footer')}>
                    <div className={cx('policy-wrapper')}>
                        {modalContext.typeForm !== 'loginForm' && (
                            <div className={cx('policy')}>
                                <p>
                                    By continuing, you agree to TikTok’s{' '}
                                    <a
                                        href="https://www.tiktok.com/legal/page/row/terms-of-service/en"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Terms of Service
                                    </a>{' '}
                                    and confirm that you have read TikTok’s{' '}
                                    <a
                                        href="https://www.tiktok.com/legal/page/row/privacy-policy/en"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Privacy Policy.
                                    </a>
                                </p>
                            </div>
                        )}
                    </div>
                    {modalContext.typeForm === 'login' || modalContext.typeForm === 'loginForm' ? (
                        <div className={cx('bottom')}>
                            Don't have an account?
                            <span onClick={() => modalContext.handleChangeForm('register')}>Sign up</span>
                        </div>
                    ) : (
                        <div className={cx('bottom')}>
                            Already have an account?
                            <span
                                onClick={() => {
                                    modalContext.handleChangeForm('login');
                                }}
                            >
                                Log in
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className={cx('modal-close-btn')} onClick={() => modalContext.closeModal()}>
                <XIcon />
            </div>
        </div>
    );
}

export default ModalItem;
