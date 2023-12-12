import classNames from 'classnames/bind';

import styles from '../Form.module.scss';
import LoginWithUsername from './LoginWithUsername';

const cx = classNames.bind(styles);

function LoginForm() {
    return (
        <div style={{ width: '375px', height: '330px', margin: 'auto' }}>
            <h2 className={cx('title')}>Log in</h2>
            <LoginWithUsername />
        </div>
    );
}

export default LoginForm;
