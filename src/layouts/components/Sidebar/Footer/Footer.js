import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer({ children }) {
    return <footer className={cx('wrapper')}>{children}</footer>;
}

Footer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Footer;
