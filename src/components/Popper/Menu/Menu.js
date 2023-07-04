import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { useState } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper/';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn, ...passProps }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
        
    // luon quay lai trang dau tien sau khi tat menu
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    }

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    }

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
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onBack={handleBack}
                            />
                        )}
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
