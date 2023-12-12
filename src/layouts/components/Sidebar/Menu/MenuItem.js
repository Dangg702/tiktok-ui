import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ to, title, icon, activeIcon }) {
    const renderMenu = (activeItem = false) => {
        return (
            <>
                {activeItem ? activeIcon : icon}
                <span className={cx('title')}>{title}</span>
            </>
        );
    };

    return (
        <NavLink to={to} className={(nav) => cx('menu-item', { active: nav.isActive })}>
            {({ isActive }) => renderMenu(isActive)}
        </NavLink>
    );
}

MenuItem.propTypes = {
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node,
    activeIcon: PropTypes.node,
};

export default MenuItem;
