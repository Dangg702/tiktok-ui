import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import Modal from 'react-modal';
import Button from '~/components/Button/Button';
import { useModal } from '~/hooks';
import { Wrapper as PopperWrapper } from '~/components/Popper/';
import Header from './Header';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import { LoginContext } from '~/components/LoginContext';

const cx = classNames.bind(styles);

const defaultFn = () => {};

const customStyles = {
    content: {
        width: '400px',
        height: '194px',
        padding: '32px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        border: '1px solid rgba(22, 24, 35, 0.03)',
        boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 8px',
        backgroundColor: 'var(--white)',
        overflow: 'none',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: '999',
    },
};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn, ...passProps }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const isLogin = localStorage.getItem('token') !== null;
    // const [data, setData] = useState({});
    const loginContext = useContext(LoginContext);
    const { modalIsOpen, openModal, closeModal } = useModal();

    // luon quay lai trang dau tien sau khi tat menu
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <div key={index}>
                    <MenuItem
                        key={index}
                        data={item}
                        onClick={() => {
                            if (isParent) {
                                setHistory((prev) => [...prev, item.children]);
                            } else {
                                onChange(item);
                            }
                            if (item.title === 'View profile') {
                                item.to = `/@${loginContext.data.nickname}`;
                            }
                            if (item.title === 'Log out' && isLogin) {
                                openModal();
                            }
                        }}
                    />
                    <Modal
                        id="modal-logout"
                        closeTimeoutMS={500}
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        appElement={document.getElementById('root')}
                    >
                        <div className={cx('modal-logout-wrapper')}>
                            <div className={cx('logout-title')}>Are you sure you want to log out?</div>
                            <div className={cx('logout-btn-wrapper')}>
                                <Button outlineGray large onClick={() => closeModal()}>
                                    Cancel
                                </Button>
                                <Button outlinePrimary large onClick={() => loginContext.handleLogOut()}>
                                    Log out
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        });
    };

    return (
        <Tippy
            {...passProps}
            interactive={true} //cho phep click vao ben trong tooltip
            // visible
            delay={[0, 700]}
            placement="bottom-end"
            offset={[12, 8]}
            // click vào k bị ẩn menu
            hideOnClick={hideOnClick}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {/* có từ 2 cấp trở lên thì hiện header */}
                        {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                        <div className={cx('menu-body')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.prototype = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
