import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import styles from './DefaultLayout.module.scss';
import Sidebar from '~/layouts/components/Sidebar';
import { ModalContext } from '~/components/ModalContext';
import { LoginContext } from '~/components/LoginContext';
import { getCurrentUser } from '~/services/getUserService';
import ModalItem from '~/components/ModalItem';
import EditProfileForm from '~/components/EditProfileForm';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const contextModal = useContext(ModalContext);
    const contextLogin = useContext(LoginContext);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCurrentUser();
            if (result) {
                contextLogin.handleSetData(result);
            }
        };
        if (token) {
            fetchApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [children]);
    return (
        <div className={cx('wrapper')}>
            <Header />
            {contextModal.isLogout && <span className={cx('notify')}>Log out Success</span>}
            {contextLogin.isNotify && <span className={cx('notify')}>Login Success</span>}
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            {/* {contextModal.activeLogOut && <LogOutForm />} */}
            {contextModal.active && <ModalItem />}
            {contextModal.activeEditProfile && <EditProfileForm />}
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
