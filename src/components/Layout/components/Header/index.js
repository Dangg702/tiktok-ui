import classNames from 'classnames/bind';
import styles from './Header.module.scss';

// bind ràng buộc theo styles đã import --> trả về func
// classNames giúp viết được tên class có chứa dấu -
const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}></div>
        </header>
    );
}

export default Header;
